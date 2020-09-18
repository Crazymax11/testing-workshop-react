import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroesContainer } from ".";
import { Provider } from "react-redux";
import { createLocalStore } from "../../stores";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { heroes } from "./fixtures";
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
    store = createLocalStore();
    server.resetHandlers();
  });
  it("должен загрузить список героев при старте приложения", async () => {
    const spy = apiMock.getCharacters.ok(server, heroes);

    renderHeroesPage();

    await wait();

    expect(pageObject.getHeroes()).toEqual(heroes.map((hero) => hero.name));
    expect(spy).toHaveBeenCalled();
  });

  it("должен отобразить двух героев если пришли только 2 героя", async () => {
    apiMock.getCharacters.ok(server, heroes.slice(0, 2));

    renderHeroesPage();

    await wait();

    expect(pageObject.getHeroes().length).toEqual(2);
  });

  it("должен перейти на страницу героя если кликнуть по карточке героя в списке", async () => {
    apiMock.getCharacters.ok(server, heroes);

    const { history } = renderHeroesPage();

    await wait();

    pageObject.chooseHero("Daredevil");

    const daredevilid = heroes.find((hero) => hero.name === "Daredevil")?.id;

    expect(history.location.pathname).toEqual(`/heroes/${daredevilid}`);
  });
});

function renderHeroesPage() {
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

function wait(ms = 20) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
