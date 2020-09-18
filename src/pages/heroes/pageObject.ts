import { screen, fireEvent } from "@testing-library/react";

export const pageObject = {
  getHeroes() {
    return screen.getAllByTestId("heroname").map((node) => node.textContent);
  },

  chooseHero(heroName: string) {
      fireEvent.click(screen.getByText(heroName));
  }
};
