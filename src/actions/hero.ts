import { AxiosError } from "axios";
import { createAction, createAsyncAction } from "typesafe-actions";
import { Character } from "../marvel-api";
import { RootDispatch, GetRootState, ThunkExtraArgument } from "../stores";

export const removeHero = createAction("removeHero")();

export const fetchHeroFlow = createAsyncAction(
  "fetchHeroStart",
  "fetchHeroSuccess",
  "fetchHeroError"
)<undefined, Character, AxiosError>();

export const fetchHero = (id: string) => async (
  dispatch: RootDispatch,
  _getState: GetRootState,
  { marvelClient }: ThunkExtraArgument
) => {
  try {
    dispatch(fetchHeroFlow.request());
    const { data } = await marvelClient.getCharacter(id);
    dispatch(fetchHeroFlow.success(data));
  } catch (error) {
    dispatch(fetchHeroFlow.failure(error));
  }
};
