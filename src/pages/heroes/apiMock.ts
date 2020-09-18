import { setupServer } from "msw/node";
import { rest } from "msw";
import { heroes } from "./fixtures";

export const apiMock = {
  getCharacters: {
    ok(server: ReturnType<typeof setupServer>, response: any) {
      const spy = jest.fn();
      server.use(
        rest.get(
          "https://gateway.marvel.com/v1/public/characters",
          (req, res, ctx) => {
            spy();
            return res.once(
              ctx.status(200),
              ctx.json({ data: { results: response } })
            );
          }
        )
      );
      return spy;
    },
  },
};
