import React, { ComponentProps } from "react";
import { Users } from ".";
import { users } from "./fixtures";
import { createExample } from "../../StoryExample";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
export default {
  title: "UsersList",
};

const defaultProps: ComponentProps<typeof Users> = {
  loadUsers: action("loadUsers"),
  isLoading: false,
  users,
};

const UsersExample = createExample(Users, defaultProps);

export const Overview = () => (
  <UsersExample exampleTitle="Cтраница с юзерами" />
);

export const load = () => (
  <UsersExample exampleTitle="Cтраница с юзерами" users={[]} />
);

export const knobs = (args: any) => (
  <UsersExample exampleTitle="knobs" users={[]} {...args} />
);
knobs.args = {
  isLoading: true,
};

export const knobs2 = () => (
  <UsersExample
    exampleTitle="knobs"
    users={[]}
    isLoading={boolean("isLoading", false)}
  />
);
