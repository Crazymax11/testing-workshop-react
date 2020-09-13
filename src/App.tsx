import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./stores/users";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UsersContainer } from "./pages/usersList";
import { UserContainer} from './pages/user'
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
            <Route path="/:id"><UserContainer/></Route>
          </Switch> 
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
