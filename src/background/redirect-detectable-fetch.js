import { getNextFetchRequestId, getNextRedirectDestination } from "./web-request-listeners";
import { promiseAnyValue } from "./promise-any-value";

export const redirectDetectableFetch = async (url) => {
  const [key, promiseResult] = await promiseAnyValue(new Map([
    ["gettingRedirectDestination", getNextFetchRequestId(url).then(getNextRedirectDestination)],
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
