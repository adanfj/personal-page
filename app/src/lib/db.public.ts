import { FetchInstance } from "./db.d";


export const publicApi = new FetchInstance(process.env.PUBLIC_URL, true);
export const publicApiReal = new FetchInstance(process.env.PUBLIC_API_URL, true);
