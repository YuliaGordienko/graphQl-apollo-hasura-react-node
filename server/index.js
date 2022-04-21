const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const users = [
  { id: 123455676788, username: "Yulia", age: 33 },
  { id: 123345567678, username: "Kira", age: 2 },
];

const app = express();
app.use(cors());
const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};
const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};
app.listen((port = 5000), () => {
  console.log("server run");
});
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);
