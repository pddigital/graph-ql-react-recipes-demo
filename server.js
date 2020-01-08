const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const bodyParser = require("body-parser");
const Recipe = require("./models/Recipe");
const User = require("./models/User");

const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error(err);
  });

const app = express();

app.use(bodyParser.json());

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use(
  "/graphql",
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
