import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "../../stores/users";
import { RootState, RootDispatch } from "../../stores";
import { loadUsers } from "../../actions/actions";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Input,
} from "@material-ui/core";

type Props = {
  loadUsers(): void;
  users: User[];
  isLoading: boolean;
  failed?: string;
};
export const Users = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (props.users.length === 0) {
      props.loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [search, setSearch] = useState("");
  if (props.isLoading) {
    return <div>loading</div>;
  }
  if (props.failed) {
    return <div>failed</div>;
  }

  const filteredUsers = props.users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.company.toLowerCase().includes(search.toLowerCase()) ||
      user.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Input
        placeholder="имя пользователя"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <Grid container spacing={8}>
          {filteredUsers.map((user) => {
            return (
              <Grid item xs={4}>
                <Card>
                  <CardHeader title={user.name} subheader={user.id} />
                  <CardContent>
                    <div>
                      <div>{user.name}</div>
                      <div>{user.username}</div>
                      <div>{user.email}</div>
                      <div>{user.address}</div>
                      <div>{user.company}</div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      Открыть
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Box>
  );
};

function mapStateToProps(state: RootState) {
  return {
    users:
      state.users.list.users?.map((userId) => state.users.users[userId]) || [],
    isLoading: state.users.list.isLoading,
    failed: state.users.list.failed,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    loadUsers: () => dispatch(loadUsers()),
  };
}
export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
