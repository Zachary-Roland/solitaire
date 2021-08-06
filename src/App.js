// imports CSS
import "./App.css";
// imports React
import React, { useContext } from "react";
// imports components
import AboutPage from "./components/AboutPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SolitairePage from "./components/SolitairePage";
// imports routing
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
// imports context
import { UserContext } from "./context/UserContext";
// imports useFetch
import useFetch from "./hooks/useFetch";
// imports components from react-bootstrap
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";

function App() {
  const { username, logout } = useContext(UserContext);
  const { callAPI: validateCall } = useFetch("GET");
  return (
    <Router>
      <nav>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Navbar.Brand>Solitaire</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {!username && (
                <>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </>
              )}
              {username && (
                <>
                  <Link className="nav-link" to="/game">
                    Game
                  </Link>
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={() => logout()}
                  >
                    Logout
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </nav>
      <main>
        <Switch>
          <div className="App">
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/game">
              <SolitairePage />
            </Route>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </div>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
