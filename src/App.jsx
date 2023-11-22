import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Countries} />
        <Route path="/countries/:cca2" component={CountryDetails} />
      </Switch>
    </Router>
  );
}

export default App;
