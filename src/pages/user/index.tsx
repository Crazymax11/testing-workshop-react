import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { RootState } from "../../stores";
import { connect, useSelector, useDispatch } from "react-redux";
import { UsersState } from "../../stores/users";
import { useParams, useHistory } from "react-router-dom";
import { loadUser } from "../../actions/actions";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  Button,
} from "@material-ui/core";

interface Props {
  user: UsersState["users"][string] | undefined;
  isLoading: boolean;
  failed?: string;
  getUser(): void;
}

export const User = (props: Props) => {
  const history = useHistory();
  useEffect(() => {
    if (!props.user) {
      console.log("getUser");
      props.getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.user) {
    return <UserSkeleton />;
  }

  if (props.isLoading) {
    return <UserSkeleton />;
  }

  if (props.failed) {
    return <div>errror</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader title={props.user?.name} subheader={props.user?.id} />
        <CardContent>
          <Field body={props.user?.name} title="name" />
          <Field body={props.user?.username} title="name" />
          <Field body={props.user?.email} title="email" />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/`);
            }}
          >
            Назад к списку
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export const UserSkeleton = () => {
  return <Skeleton />;
};

export const UserContainer = () => {
  let { id } = useParams();

  const isLoading = useSelector(
    (state: RootState) => state.users.currentUser.isLoading
  );
  const failed = useSelector(
    (state: RootState) => state.users.currentUser.failed
  );
  const user = useSelector((state: RootState) => state.users.users[id]);

  const dispatch = useDispatch();
  const getUser = () => dispatch(loadUser(id));

  return (
    <User user={user} failed={failed} isLoading={isLoading} getUser={getUser} />
  );
};

function Field(props: { title: string; body: string }) {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.body}</div>
    </div>
  );
}
