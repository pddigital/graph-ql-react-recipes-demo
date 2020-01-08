import React from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";

const App = () => (
  <div className="app">
    <h1>Home</h1>
    <Query></Query>
  </div>
);
export default App;
