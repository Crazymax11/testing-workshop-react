import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./stores";
import Heroes from "./pages/heroes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/heroes">
            <Heroes />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
