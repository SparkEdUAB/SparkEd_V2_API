import "./register-api";
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'

// resolvers
import resolvers from '../../api/resolvers'

// typedefs
import typeDefs from '../../api/typdefs'



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) =>  ({
    user: await getUser(req.headers.authorization)
  })
})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})