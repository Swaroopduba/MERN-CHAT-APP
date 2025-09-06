import { Button } from "@chakra-ui/react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/chats" component={Chatpage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
