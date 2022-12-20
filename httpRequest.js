import makeAFetch from "./makeAFetch.js";

export default function httpRequest() {
  return new (function () {
    this.get = (url, headers) => makeAFetch({ url, header: headers });

    this.post = (url, body, headers) =>
      makeAFetch({ url, body, headers, method: "POST" });

    this.patch = (url, body, headers) =>
      makeAFetch({ url, body, headers, method: "PATCH" });

    this.delete = (url, headers) =>
      makeAFetch({ url, headers, method: "DELETE" });

    this.put = (url, body, headers) =>
      makeAFetch({ url, body, headers, method: "PUT" });
  })();
}
