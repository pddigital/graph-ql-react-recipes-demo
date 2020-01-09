import React from "react";

import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const Signout = ({ history }) => {
  function handleSignout(client) {
    localStorage.setItem("token", "");
    client.resetStore();
    history.push("/");
  }

  return (
    <ApolloConsumer>
      {client => {
        return (
          <button
            onClick={() => {
              handleSignout(client);
            }}
          >
            Signout
          </button>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(Signout);
