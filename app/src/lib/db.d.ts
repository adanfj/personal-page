import { PUBLIC_API_URL } from "$env/static/public";
import appFetchData from "./appFetchData";

export type AppFetch<T> = [{ [K in keyof T]: number }, ...T[keyof T][]];
/**
 * Checks if the given data is an object.
 *
 * @param {T | AppFetch<T>} data - The data to be checked.
 * @return {boolean} True if the data is an object, false otherwise.
 */
export function fetchIsObject<T extends object>(data: T | AppFetch<T>): data is T {
    return !Object.hasOwn(data as T, "data");
}
/**
 * Checks if the given data is an instance of AppFetch.
 *
 * @param {T | AppFetch<T>} data - The data to be checked.
 * @returns {data is AppFetch<T>} Returns true if the data is an instance of AppFetch, otherwise false.
 */
export function fetchIsFetch<T extends object>(data: T | AppFetch<T>): data is AppFetch<T> {
    return Object.hasOwn(data as AppFetch<T>, "data");
}

//FetchInstance that works like AxiosInstance
export class FetchInstance {
    public defaultHeaders:Record<string,string>={};
    constructor(
        private baseURL: string,
        private withCredentials: boolean
    ) {
        this.baseURL = baseURL;
        this.withCredentials = withCredentials;

    }

    async get<T extends object>(path: string,body?: object) {
        // console.log("GET",`${this.baseURL}${path}`);
        let data = await appFetchData<T>(`${this.baseURL}${path}`, "GET", body,this.defaultHeaders, this.withCredentials);
        if (fetchIsFetch<typeof data>(data)) {
            return Object.fromEntries(Object.entries(data[0]).map(([key, index]) => [key, (data as AppFetch<T>)[index as number]])) as T;
        }
        else if (fetchIsObject<typeof data>(data)) return data as T
        else throw new Error("Data is invalid");
    }
    async post<T extends object>(path: string, body?: string | object | FormData) {
        // console.log("POST",`${this.baseURL}${path}`);
        let data = await appFetchData<T>(`${this.baseURL}${path}`, "POST", body,this.defaultHeaders, this.withCredentials);
        if (fetchIsFetch<typeof data>(data)) {
            return Object.fromEntries(Object.entries(data[0]).map(([key, index]) => [key, (data as AppFetch<T>)[index as number]])) as T;
        }
        else if (fetchIsObject<typeof data>(data)) return data as T
        else throw new Error("Data is invalid");
    }
    async put<T extends object>(path: string, body?: string | object | FormData) {
        let data = await appFetchData<T>(`${this.baseURL}${path}`, "PUT", body,this.defaultHeaders, this.withCredentials);
        if (fetchIsFetch<typeof data>(data)) {
            return Object.fromEntries(Object.entries(data[0]).map(([key, index]) => [key, (data as AppFetch<T>)[index as number]])) as T;
        }
        else if (fetchIsObject<typeof data>(data)) return data as T
        else throw new Error("Data is invalid");
    }
}