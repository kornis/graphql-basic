const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 3000;
const resolvers = require('./resolvers');
console.log(resolvers)
require('dotenv').config();

//body parser json
app.use(express.json());
//cors
app.use(cors());

const typeDefs = gql`
type Query {
    getUsers: [User!]
    getUser(id: ID!): User
    getTask(id: ID!): Task
    getTasks: [Task!]
}

type User {
    id: ID!
    name: String!
    email: String!
    task: [Task!]
}

type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
}

input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
}

input createUserInput {
    name: String!
    email: String!
}

type Mutation {
    createTask(input: createTaskInput): Task,
    createUser(input: createUserInput): User,
}

`;



const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.use('/', (req, res, next) => {
    res.send({ message: 'Hello' });
});



app.listen(PORT, ()=> {
    console.log(`Server listening on PORT:${PORT}`);
    console.log(`Graphql path at: ${apolloServer.graphqlPath}`)
});
