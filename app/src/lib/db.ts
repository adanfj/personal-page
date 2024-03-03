import { PRIVATE_API_URL } from "$env/static/private";
import { FetchInstance } from "./db.d";

export const api = new FetchInstance(PRIVATE_API_URL, true);