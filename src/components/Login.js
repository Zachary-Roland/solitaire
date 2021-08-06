import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";
import useFetch from "../hooks/useFetch";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { callAPI: loginCall } = useFetch("POST");
  const [error, setError] = useState(null);
  const history = useHistory();
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
            }}
            value={username}
          />
          <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setError(null);
              setPassword(e.target.value);
            }}
            value={password}
          />
          <Form.Text></Form.Text>
        </Form.Group>
        <Button
          type="button"
          onClick={async () => {
            if (
              username.length >= 4 &&
              password.length >= 4 &&
              username.length <= 20 &&
              password.length <= 20
            ) {
              setError(null);
              let res = await loginCall("/api/users/login", {
                username,
                password,
              });
              if (res.error) {
                return setError(res.error);
              }
              login(res.data.username);
              history.push("/game");
            } else {
              setError(
                "Username & Password must be between 4 and 20 characters!"
              );
            }
          }}
        >
          Submit
        </Button>
        <Button
          type="button"
          variant="outline-primary"
          onClick={() => {
            history.push("/signup");
          }}
        >
          Create An Account!
        </Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </>
  );
};

export default Login;
