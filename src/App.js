import "./App.css";
import AboutPage from "./components/AboutPage";
import Login from "./components/Login";
import SigninPage from "./components/SigninPage";
import Signup from "./components/Signup";
import SolitairePage from "./components/SolitairePage";

function App() {
  return (
    <div className="App">
      <AboutPage />
      <Login />
      <SigninPage />
      <Signup />
      <SolitairePage />
    </div>
  );
}

export default App;
