import "./App.css";
import StartPage from "./Pages/StartPage/StartPage";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
