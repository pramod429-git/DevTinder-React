//export const BASE_URL = "http://localhost:7777"; // only works in local
//export const BASE_URL = "/api";

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";
