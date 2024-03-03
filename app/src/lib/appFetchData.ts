import appFetch from "./appFetch";
import type { AppFetch } from "./db";

// place files you want to import through the `$lib` alias in this folder.
export default async <T>(url: string, method = "GET", body?: FormData | object | string, defaultHeaders?: Record<string, string>, withCredentials = false) => {
    let json, res: Response;
    try {
        res = await appFetch(url, method, body, defaultHeaders, withCredentials);
        json = await res.json();
        if (!json) throw new Error("Data is invalid");
    } catch (error) {
        // console.error(error);
        res = await appFetch(url, method, body, defaultHeaders, withCredentials);
        throw await res.text();
    }
    if (Object.hasOwn(json, "data")) {
        let data = JSON.parse(json.data) as any[];
        return data as AppFetch<T>
    };
    return json as T;
    // try {
    // } catch (error) {
    //     return { error }
    // }
};
