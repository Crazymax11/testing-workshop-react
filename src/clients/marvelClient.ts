import axios, { AxiosInstance } from "axios";
import { CharactersResponse } from "../marvel-api";

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
    return this.http.get<CharactersResponse>("/characters");
  }
}
