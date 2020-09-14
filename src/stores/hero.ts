import { Character } from "../marvel-api";

type Action =
  | {
      type: "fetchHeroStart";
    }
  | {
      type: "fetchHeroSuccess";
      payload: Character;
    }
  | {
      type: "removeHero";
    };

type HeroState = {
  hero: Character["data"]["results"][0] | null;
};

const initialState: HeroState = {
  hero: null,
};

export function heroReducer(
  state: HeroState = initialState,
  action: Action
): HeroState {
  switch (action.type) {
    case "fetchHeroSuccess": {
      return {
        ...state,
        hero: action.payload.data.results[0],
      };
    }
    case "removeHero": {
      return {
        ...state,
        hero: null,
      };
    }
    default: {
      return state;
    }
  }
}
