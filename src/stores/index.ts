import thunk, { ThunkDispatch } from "redux-thunk";
import { Action, createStore, combineReducers, applyMiddleware } from 'redux';
import { StateType, ActionType } from 'typesafe-actions';
import { userReducer } from "./users";




const reducer =combineReducers({ users: userReducer })
export const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );


export type ReducerState = StateType<typeof reducer>;
export type RootState = ReducerState;
export type RootDispatch = ThunkDispatch<RootState, undefined, Action>;
export type GetRootState = () => ReducerState;