import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { RootDispatch, GetRootState, ThunkExtraArgument } from "../stores";
import { Characters } from "../marvel-api";

export const fetchHeroesFlow = createAsyncAction(
  "fetchHeroesStart",
  "fetchHeroesSuccess",
  "fetchHeroesError"
)<undefined, Characters, AxiosError>();

export const fetchHeroes = () => async (
  dispatch: RootDispatch,
  getState: GetRootState,
  { marvelClient }: ThunkExtraArgument
) => {
  const { heroes } = getState();
  dispatch(fetchHeroesFlow.request());

  if (heroes.items !== null) {
    dispatch(fetchHeroesFlow.success(heroes.items));
    return;
  }

  try {
    const { data } = await marvelClient.getCharacters();
    dispatch(fetchHeroesFlow.success(data));
  } catch (error) {
    dispatch(fetchHeroesFlow.failure(error));
  }
};
