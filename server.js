const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const bodyParser = require("body-parser");
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const cors = require("cors");

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

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use(
  "/graphql",
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
