import axios, { AxiosInstance } from "axios";
import { Characters, Character } from "../marvel-api";

export class MarvelClient {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://gateway.marvel.com/v1/public",
      params: {
        apikey: process.env.REACT_APP_MARVEL_API_KEY,
      },
    });
  }

  getCharacters() {
    return this.http.get<Characters>("/characters", {
      params: {
        limit: 50,
      },
    });
  }

  getCharacter(id: string) {
    return this.http.get<Character>(`/characters/${id}`);
  }
}
