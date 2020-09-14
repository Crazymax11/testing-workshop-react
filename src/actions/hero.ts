import { RootDispatch, GetRootState, ThunkExtraArgument } from "../stores";

export const fetchHero = (id: string) => async (
  dispatch: RootDispatch,
  _getState: GetRootState,
  { marvelClient }: ThunkExtraArgument
) => {
  try {
    const { data } = await marvelClient.getCharacter(id);
    dispatch({ type: "fetchHeroSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "fetchHeroError" });
  }
};

export const removeHero = () => async (dispatch: RootDispatch) => {
  dispatch({ type: "removeHero" });
};
