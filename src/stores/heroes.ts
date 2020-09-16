import { createReducer, ActionType } from "typesafe-actions";
import { Characters } from "../marvel-api";
import * as heroesActions from "../actions/heroes";

type HeroesAction = ActionType<typeof heroesActions>;

type HeroesState = {
  status: "idle" | "loading" | "loaded" | "error";
  items: Characters | null;
};

const initialState: HeroesState = {
  status: "idle",
  items: null,
};

export const heroesReducer = createReducer<HeroesState, HeroesAction>(
  initialState,
  {
    fetchHeroesStart: (state, _action) => ({
      ...state,
      status: "loading",
    }),
    fetchHeroesSuccess: (state, action) => ({
      ...state,
      items: action.payload,
      status: "loaded",
    }),
    fetchHeroesError: (state, action) => ({
      ...state,
      status: "error",
    }),
  }
);
