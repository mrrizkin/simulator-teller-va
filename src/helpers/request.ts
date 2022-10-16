import axios from "axios";

export default class Request {
  private baseUrl: string;
  private headers: any;

  constructor(token: string) {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  public setToken(token: string) {
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  public async get(url: string) {
    return axios.get(`${this.baseUrl}${url}`);
  }

  public async post(url: string, data: any) {
    return axios.post(`${this.baseUrl}${url}`, data, {
      headers: this.headers,
    });
  }
}
