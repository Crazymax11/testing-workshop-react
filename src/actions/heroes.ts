import { RootDispatch, GetRootState, ThunkExtraArgument } from "../stores";

export const fetchHeroes = () => async (
  dispatch: RootDispatch,
  _getState: GetRootState,
  { marvelClient }: ThunkExtraArgument
) => {
  try {
    const { data } = await marvelClient.getCharacters();
    dispatch({ type: "fetchHeroesSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "fetchHeroesError" });
  }
};
