import { setupServer } from "msw/node";
import { rest } from "msw";

export const apiMock = {
  getCharacters: {
    ok(server: ReturnType<typeof setupServer>, result: any) {
      const spy = jest.fn();
      server.use(
        rest.get(
          "https://gateway.marvel.com/v1/public/characters",
          (req, res, ctx) => {
            spy();
            return res.once(
              ctx.status(200),
              ctx.json({ data: { results: result } })
            );
          }
        )
      );
      return spy;
    },
  },
};
