import { gql } from 'apollo-server-express'

const courseDefs = gql`
  type Subscription {
   courseAdded: Course
  }
  type Query {
    getCourses: [Course]
  }

  type Course {
    _id: String
    name: String
    
    createdAt: String
    createdBy: String
    createdByName: String
  }
  
  type Mutation {
    # A mutation to add a new channel to the list of channels
    addCourse(name: String!, createdAt: String, createdBy: String): Course
    deleteCourse(ids: [String]!): Course
    updateCourse(id: String!, name: String): Course
  }
`
export default courseDefs
