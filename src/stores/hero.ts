import { createReducer, ActionType } from "typesafe-actions";
import { Character } from "../marvel-api";
import * as heroActions from "../actions/hero";

type HeroAction = ActionType<typeof heroActions>;

type HeroState = {
  status: "idle" | "loading" | "loaded" | "error";
  item: Character["data"]["results"][0] | null;
};

const initialState: HeroState = {
  status: "idle",
  item: null,
};

export const heroReducer = createReducer<HeroState, HeroAction>(initialState, {
  removeHero: (_state, _action) => initialState,
  fetchHeroStart: (state, _action) => ({
    ...state,
    status: "loading",
  }),
  fetchHeroSuccess: (state, action) => ({
    ...state,
    item: action.payload.data.results[0],
    status: "loaded",
  }),
});
