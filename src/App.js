// imports CSS
import "./App.css";
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
} from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        {!username && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
        {username && (
          <>
            <NavLink to="/game">Game</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink
              to="/login"
              // onClick-{() => logout()}
            >
              Logout
            </NavLink>
          </>
        )}
      </nav>
      <main>
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
        </div>
      </main>
    </Router>
  );
}

export default App;
