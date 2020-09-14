import { CharactersResponse } from "../marvel-api";

type Action =
  | {
      type: "fetchHeroesStart";
    }
  | {
      type: "fetchHeroesSuccess";
      payload: CharactersResponse;
    };

type HeroesState = {
  heroes: CharactersResponse["data"]["results"];
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
