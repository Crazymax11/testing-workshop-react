import { Characters } from "../marvel-api";

type Action =
  | {
      type: "fetchHeroesStart";
    }
  | {
      type: "fetchHeroesSuccess";
      payload: Characters;
    };

type HeroesState = {
  heroes: Characters["data"]["results"];
};

const initialState = {
  heroes: [],
};

export function heroesReducer(
  state: HeroesState = initialState,
  action: Action
): HeroesState {
  switch (action.type) {
    case "fetchHeroesSuccess": {
      return {
        ...state,
        heroes: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
}
