import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import { Heroes } from ".";
import { heroes } from "./fixtures";
import { MemoryRouter } from "react-router";
import { createExample } from "../../storyExample";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";

export default {
  title: "Heroes",
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const defaultProps: ComponentProps<typeof Heroes> = {
  status: "loaded",
  fetchHeroes: action("fetchHeroes"),
  onHeroOpen: action("onHeroOpen"),
  heroes,
};

const HeroesExample = createExample(Heroes, defaultProps);

export const Overview = () => <HeroesExample exampleTitle="Список героев" />;

export const Loading = () => (
  <HeroesExample exampleTitle="Загрузка героев" status="loading" />
);

export const Failed = () => (
  <HeroesExample exampleTitle="Ошибка загрузки героев" status="error" />
);


export const knobs = () => (
  <HeroesExample exampleTitle="knobs" status={select("status", ["loading", "loaded"], 'loading')} />
);
