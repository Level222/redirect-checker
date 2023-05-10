import { getNextFetchRedirectDestination } from "./get-next-fetch-redirect-destination";
import { promiseAnyValue } from "@utils/promise-any-value";

const forbidRedirectFetch = async (url) => {
  const response = await fetch(url);
  if (response.redirected) {
    throw new Error("Redirect is not allowed.");
  }
  return response;
};

export const redirectDetectableFetch = async (url) => {
  const [key, promiseResult] = await promiseAnyValue(new Map([
    ["gettingRedirectDestination", getNextFetchRedirectDestination(url)],
    ["fetching", forbidRedirectFetch(url)]
  ]));

  if (key === "gettingRedirectDestination") {
    const redirectUrl = promiseResult;
    return {
      redirected: true, redirectUrl
    };
  }

  const response = promiseResult;
  return {
    redirected: false, response
  };
};
