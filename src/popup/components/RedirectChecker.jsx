import { RedirectList } from "./RedirectList";
import { SimpleRedirectResult } from "./SimpleRedirectResult";
import { getRedirectDestination } from "@utils/get-redirect-destination/get-redirect-destination";
import { useState, useEffect } from "react";

export const RedirectChecker = ({ url }) => {
  const [redirectDestinations, setRedirectDestinations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(redirectDestinations)

  const setRedirectDestinationsAsync = async (urls, count) => {
    const MAX_REDIRECT_COUNT = 20;
    if (count > MAX_REDIRECT_COUNT) {
      setError(new Error("Too many redirects").toString());
      setIsLoading(false);
    }

    setRedirectDestinations(urls);

    try {
      const { redirected, redirectUrl } = await getRedirectDestination(urls.at(-1));

      if (redirected) {
        urls.push(redirectUrl);
        return await setRedirectDestinationsAsync(urls, count + 1);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.toString());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!url) {
      setRedirectDestinations([]);
      return;
    }

    setIsLoading(true);

    setRedirectDestinationsAsync([url], 0);
  }, [url]);

  return (
    <div>
      <SimpleRedirectResult
        from={redirectDestinations[0]}
        to={isLoading || redirectDestinations.at(-1)}
        isLoading={isLoading}
      />
      <RedirectList
        redirectDestinations={redirectDestinations}
        isLoading={isLoading}
      />
    </div>
  );
};
