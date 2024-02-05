import axios from "axios";

export const pagarmeClient = axios.create({
  baseURL: "https://api.pagar.me/core/v5",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
