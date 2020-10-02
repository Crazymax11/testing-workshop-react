import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { HeroesContainer } from ".";
import { createAppStore } from "../../stores";
import { setupServer } from "msw/node";
import { heroesFixture } from "./fixtures";
import { Router } from "react-router";
import { Store } from "redux";
import { pageObject } from "./pageObject";
import { apiMock } from "./apiMock";
import { createMemoryHistory } from "history";

const server = setupServer();
server.listen();

let store: Store;
describe("Heroes", () => {
  afterAll(() => {
    server.close();
  });
  beforeEach(() => {
    store = createAppStore();
    server.resetHandlers();
  });
  it("Должен загрузить список героев из апишки", async () => {
    const spy = apiMock.getCharacters.ok(server, heroesFixture);

    renderHeroes();

    const actualHeroes = await pageObject.getHeroes();

    expect(actualHeroes).toEqual(heroesFixture.map((hero) => hero.name));
    expect(spy).toHaveBeenCalled();
  });
  it("По клику на карточку должен переходить на страницу карточки", async () => {
    apiMock.getCharacters.ok(server, heroesFixture);

    const { history } = renderHeroes();

    await pageObject.chooseHero(heroesFixture[0].name);

    expect(history.location.pathname).toEqual(`/heroes/${heroesFixture[0].id}`);
  });
});

function renderHeroes() {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <HeroesContainer />
        </Router>
      </Provider>
    ),
    history,
  };
}
