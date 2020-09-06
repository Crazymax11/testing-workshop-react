import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logo from "./logo.svg";
import "./App.css";
import { userReducer } from "./stores/users";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UsersContainer } from "./pages/usersList";
import { Container } from "@material-ui/core";

const store = createStore(
  combineReducers({ users: userReducer }),
  applyMiddleware(thunk)
);

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <UsersContainer />
            </Route>
            <Route path="/:id">user</Route>
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
