import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { _Courses } from './courses';
import { _Units } from '../units/units';

Meteor.methods({
  'course.add': function courseAdd(id, course, courseCode, details) {
    check(id, String);
    check(course, String);
    check(courseCode, Match.Integer);
    check(details, Object);
    if (Roles.userIsInRole(this.userId, ['admin', 'content-manager'])) {
      _Courses.insert({
        _id: id,
        name: course,
        code: courseCode,
        details,
        createdAt: new Date(),
        createdBy: this.userId,
      });
    } else {
      throw new Meteor.Error('oops', 'You are not allowed to make changes');
    }
  },
  // eslint-disable-next-line
  'course.edit'(id, course, courseCode, language, ownerId) {
    check(id, String);
    check(course, String);
    check(courseCode, Match.Integer);
    check(language, String);
    check(ownerId, String);

    if (Roles.userIsInRole(this.userId, ['admin', 'content-manager'])) {
      _Courses.update(
        {
          _id: id,
        },
        {
          $set: {
            name: course,
            code: courseCode,
            'details.language': language,
          },
        },
      );
    } else {
      throw new Meteor.Error('oops', 'You are not allowed to not make changes');
    }
  },
  // eslint-disable-next-line
  'course.remove': function(id) {
    check(id, String);

    const units = _Units
      .find({
        'details.courseId': id,
      })
      .fetch();
    if (Roles.userIsInRole(this.userId, ['admin', 'content-manager'])) {
      if (units.length >= 1) {
        throw new Meteor.Error(
          'sorry',
          'The selected course has units that depend on it',
        );
      } else if (units.length === 0) {
        _Courses.remove(id);
      } else {
        throw new Meteor.Error(
          'no-rights',
          'You are not allowed to remove the selected course',
        );
      }
    }
  },
  // eslint-disable-next-line
  'courses.count': function() {
    _Courses.find().count();
  },
});
