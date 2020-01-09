import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import ErrorMsg from "../ErrorMsg";
import { withRouter } from "react-router-dom";

const Signup = ({ history, refetch }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(event, signupUser) {
    event.preventDefault();
    console.log(signupUser);
    signupUser().then(async data => {
      refetch();
      clearState();
      history.push("/");
    });
  }

  function clearState() {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  }

  function validateForm() {
    const isInvalid =
      !username ||
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation;
    return isInvalid;
  }

  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <Mutation
        mutation={SIGNUP_USER}
        variables={{ username, email, password }}
      >
        {(signupUser, { data, loading, error }) => {
          return (
            <form
              className="form"
              onSubmit={event => handleSubmit(event, signupUser)}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
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

export default withRouter(Signup);
