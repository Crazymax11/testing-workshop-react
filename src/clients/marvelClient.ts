import axios, { AxiosInstance } from "axios";

export class MarvelClient {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://developer.marvel.com",
      params: {
        apikey: process.env.REACT_APP_MARVEL_API_KEY,
      },
    });
  }

  getHeroes() {
    return this.http.get("/characters");
  }
}
