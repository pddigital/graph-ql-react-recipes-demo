import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import ErrorMsg from "../ErrorMsg";
import { withRouter } from "react-router-dom";

const Signin = ({ history, refetch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event, signinUser) {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem("token", data.signinUser.token);
      await refetch();
      clearState();
      history.push("/");
    });
  }

  function clearState() {
    setUsername("");
    setPassword("");
  }

  function validateForm() {
    const isInvalid = !username || !password;

    return isInvalid;
  }

  return (
    <div className="App">
      <h2 className="App">Signin</h2>
      <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
        {(signinUser, { data, loading, error }) => {
          return (
            <form
              className="form"
              onSubmit={event => handleSubmit(event, signinUser)}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading || validateForm()}
                className="button-primary"
              >
                Submit
              </button>
              {error && <ErrorMsg error={error.message} />}
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

export default withRouter(Signin);
