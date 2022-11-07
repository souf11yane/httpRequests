import { makePromise } from "../promises/index.js";

function makeAFetch({ url, method, headers, mode, cache, body }) {
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
      if (res.status < 400) return res.json();
      throw new Error(
        (await res.json()).message ||
          "there was an error while making the fetch"
      );
    });
  });
}

function httpRequest() {
  return new (function () {
    this.get = (url, headers) => {
      return makeAFetch({ url, header: headers });
    };

    this.post = (url, body, headers) => {
      return makeAFetch({ url, body, headers, method: "POST" });
    };

    this.patch = (url, body, headers) => {
      return makeAFetch({ url, body, headers, method: "PATCH" });
    };

    this.delete = (url, headers) => {
      return makeAFetch({ url, headers, method: "DELETE" });
    };

    this.put = (url, body, headers) => {
      return makeAFetch({ url, body, headers, method: "PUT" });
    };
  })();
}

export { makeAFetch, httpRequest };
