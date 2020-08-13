/* eslint-disable */
// avoid the failing builds
import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import Course from './course'
import Unit from './unit'
import Topic from './topic'
import Resource from './resource'
import User from './user'
import ExternalLink from './externalLink'

// const typesArray = fileLoader(path.join(__dirname, './*.graphql'))

export default mergeTypes([Course, User, Unit, Resource, Topic, ExternalLink])
