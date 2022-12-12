import { useState } from "react";

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);

  const requestHandler = async (
    url,
    method = "GET",
    body = {},
    headers = {}
  ) => {
    setLoading(true);

    let res;

    if (method === "GET") {
      if (Object.keys(headers).length > 0) {
        res = await fetch(url, { method: "GET", headers: headers });
      } else {
        res = await fetch(url);
      }
    } else {
      res = await fetch(url, {
        method,
        body: body,
        headers,
      });
    }

    setLoading(false);

    if (res.ok) {
      return res.json();
    }

    let err = await res.json();
    throw new Error(err.message);
  };

  return { requestHandler, isLoading, setLoading };
};
