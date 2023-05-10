import { getNextFetchRedirectDestination } from "./get-next-fetch-redirect-destination";
import { promiseAnyValue } from "@utils/promise-any-value";

export const redirectDetectableFetch = async (url) => {
  const [key, promiseResult] = await promiseAnyValue(new Map([
    ["gettingRedirectDestination", getNextFetchRedirectDestination(url)],
    ["fetching", fetch(url)]
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
