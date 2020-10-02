import React, { ComponentProps } from "react";
import { MemoryRouter } from "react-router";
import { Heroes } from ".";
import { createExample } from "../../storyExample";
import { heroesFixture } from "./fixtures";
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
  component: Heroes,
};

const defaultProps: ComponentProps<typeof Heroes> = {
  status: "loaded",
  heroes: heroesFixture,
  fetchHeroes: action("fetchHeroes"),
  onHeroOpen: action("onHeroOpen"),
};

const HeroesExample = createExample(Heroes, defaultProps);

export const Overview = () => {
  return <HeroesExample exampleTitle="Показывает героев" />;
};

export const Loading = () => {
  return (
    <HeroesExample
      exampleTitle="Страница героев во время загрузки героев"
      status="loading"
      heroes={[]}
    />
  );
};

export const Failed = () => {
  return (
    <HeroesExample
      exampleTitle="Не смогли загрузить героев"
      status="error"
      heroes={[]}
    />
  );
};

export const FewHeroes = () => {
  return (
    <HeroesExample
      exampleTitle="Загрузили мало героев"
      status="loaded"
      heroes={heroesFixture.slice(0, 2)}
    />
  );
};

export const ControlsExample = (args: any) => (
  <HeroesExample exampleTitle="Controls" {...args} />
);

ControlsExample.args = {
  status: "loaded",
};

export const KnobsExample = () => (
  <HeroesExample
    exampleTitle="Controls"
    status={select("status", ["loading", "loaded", "idle", "error"], "loading")}
  />
);
