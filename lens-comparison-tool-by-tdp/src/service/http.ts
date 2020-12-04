import { SERVER_URL } from "constant/other";

let cache: { [key: string]: any } = {};
const temp = window.localStorage.getItem('httpCache');
if (temp !== null) {
  cache = JSON.parse(temp);
}

export const getData = async <T>(path: string): Promise<T> => {
  if (path in cache) {
    return cache[path];
  } else {
    const data: T = await (await fetch(`${SERVER_URL}${path}`)).json();
    cache[path] = data;
    window.localStorage.setItem('httpCache', JSON.stringify(cache));
    return data;
  }
};
