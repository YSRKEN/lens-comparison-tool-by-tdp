import { SERVER_URL } from "constant/other";

const cache: { [key: string]: any } = {};

export const getData = async <T>(path: string): Promise<T> => {
  if (path in cache) {
    return cache[path];
  } else {
    const data: T = await (await fetch(`${SERVER_URL}${path}`)).json();
    cache[path] = data;
    return data;
  }
};
