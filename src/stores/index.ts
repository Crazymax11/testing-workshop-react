import thunk, { ThunkDispatch } from "redux-thunk";
import { Action, createStore, combineReducers, applyMiddleware } from "redux";
import { StateType } from "typesafe-actions";
import { MarvelClient } from "../clients/marvelClient";
import { heroesReducer } from "./heroes";
import { heroReducer } from "./hero";

const marvelClient = new MarvelClient();

export const reducer = combineReducers({
  heroes: heroesReducer,
  hero: heroReducer,
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument({ marvelClient }))
);

export type ReducerState = StateType<typeof reducer>;
export type RootState = ReducerState;
export type GetRootState = () => ReducerState;
export type ThunkExtraArgument = { marvelClient: MarvelClient };
export type RootDispatch = ThunkDispatch<RootState, ThunkExtraArgument, Action>;
