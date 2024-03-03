// import axios from "ax"
// place files you want to import through the `$lib` alias in this folder.
export default async (url:string|URL, method = "GET", body?:FormData|object|string,defaultHeaders?:Record<string,string>,withCredentials=false) => {
    if (!body)
        body = {};
    let typeHeader:Record<string,string>|undefined = (typeof body == "object" && !(body instanceof FormData)) ||
        typeof body == "string"
        ? { "Content-Type": "application/json" }
        : undefined;
    if(defaultHeaders)typeHeader = {...typeHeader,...defaultHeaders}
    let options = {
        method,
        headers: typeHeader,
        // mode: "same-origin",
        body: method == "GET" ? undefined : (typeof body == "object" && !(body instanceof FormData)
        ? JSON.stringify(body)
        : body),
    } as any;
    if(withCredentials) options.credentials="include"
    if(method=="GET")
        {
            url = new URL(url)
            url.search = new URLSearchParams(body as Record<string,string>).toString()
            url = url.href
        }
    return /* const res = await  */fetch(url, options);
};
