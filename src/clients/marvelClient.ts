import axios, { AxiosInstance } from "axios";

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

  getHeroes() {
    return this.http.get("/characters");
  }
}
