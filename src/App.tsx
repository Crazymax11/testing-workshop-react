import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./stores";
import Heroes from "./pages/heroes";
import Hero from "./pages/hero";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/heroes">
            <Heroes />
          </Route>
          <Route path="/heroes/:id">
            <Hero />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
