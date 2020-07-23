import { AuthenticationError, PubSub } from 'apollo-server-express'
import { _Courses} from '../courses/courses'
import { _Units } from '../units/units'
import { _Topics } from '../topics/topics'

export const pubsub = new PubSub()
const COURSE_ADDED = 'COURSE_ADDED'
const resolvers = {
  Subscription: {
    courseAdded: {
      subscribe: () => pubsub.asyncIterator([COURSE_ADDED]),
    },
  },

  Query: {
    getCourses(root, args, { user })  {
      return _Courses.find({}).fetch()
    }
  },
  Mutation: {
    addCourse(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('you must be logged in to add a course')
      }
      console.log('course added')
      // once authenticated create a course here.
      pubsub.publish(COURSE_ADDED, { courseAdded: args })
    },
    deleteCourse(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError(
          'you must be logged in to delete a course'
        )
      }
      console.log('course deleted')
    },
    updateCourse(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError(
          'you must be logged in to update a course'
        )
      }
      console.log('course updated')
    },
  },

}

export default resolvers
