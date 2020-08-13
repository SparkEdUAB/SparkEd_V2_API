import { gql } from 'apollo-server-express'

const userDefs = gql`
  type Query {
    getUserById(_id: String!): [User]
    
  }
  type Mutation {
    register(
      email: String!
      password: String!
      gender: String!
      grade: String!
      phone: String!
      name: String!
     
    ): User!
    login(email: String!, password: String!): User!
    deleteUser(ids: [String]!): User
  }
  type User {
    _id: String!
    profile: [profile]!
   
  }

  type profile {
      name: String!
      grade: String!
  }
`

export default userDefs
