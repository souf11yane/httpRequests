import { makePromise } from "promises";

export default function makeAFetch({
  url,
  method,
  headers,
  mode,
  cache,
  body,
}) {
  let options = {
    method: method || "GET",
    headers: new Headers(headers),
    mode: mode || "cors",
    cache: cache || "default",
  };

  if (["POST", "PATCH", "PUT"].includes(method)) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body || {});
  }

  return makePromise(() => {
    return fetch(url || "", options).then(async (res) => {
      let result = await res.json();
      if (res.status < 400) return result;
      console.error(res);
      throw new Error(
        result.message || "there was an error while making the fetch"
      );
    });
  });
}
