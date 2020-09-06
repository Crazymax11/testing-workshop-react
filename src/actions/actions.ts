import { UsersClient } from "../clients/usersClient";
import { RootDispatch, GetRootState } from "../stores";

const usersClient = new UsersClient();
export const loadUsers = () => (
  dispatch: RootDispatch,
  getState: GetRootState
) => {
  dispatch({
    type: "listLoadingStarted",
  });
  usersClient.getUsers().then(
    (data) => {
      dispatch({
        type: "listLoadingFinished",
        payload: data,
      });
    },
    (err) => {
      dispatch({
        type: "listLoadingFailed",
        payload: err.message,
      });
    }
  );
};
