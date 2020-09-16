import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { store } from "./stores";
import { HeroesContainer } from "./pages/heroes";
import { HeroContainer } from "./pages/hero";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HeroesContainer onHeroOpen={console.log} />
          </Route>
          <Route path="/heroes/:id">
            <HeroContainer />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
