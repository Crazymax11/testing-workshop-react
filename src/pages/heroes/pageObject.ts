import { fireEvent, screen } from "@testing-library/react";

export const pageObject = {
  getHeroes() {
    return screen
      .findAllByTestId("heroname")
      .then((els) => els.map((el) => el.textContent));
  },

  async chooseHero(heroname: string) {
    fireEvent.click(await screen.findByText(heroname));
  },
};
