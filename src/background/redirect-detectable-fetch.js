import { getNextFetchRequestId, getNextRedirectDestination } from "./web-request-listeners";

export const redirectDetectableFetch = async (url) => {
  const gettingRedirectDestination = getNextFetchRequestId(url).then(getNextRedirectDestination);
  const response = await fetch(url);

  if (response.redirected) {
    const redirectUrl = await gettingRedirectDestination;
    return {
      response, redirected: true, redirectUrl
    };
  }

  return {
    response, redirected: false
  };
};
