import { getDocumentRedirectDestination } from "./get-document-redirect-destination";
import { redirectDetectableFetch } from "./redirect-detectable-fetch";

export const getRedirectDestination = async (url) => {
  const { response, redirected, redirectUrl } = await redirectDetectableFetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  if (redirected) {
    return { redirected, redirectUrl };
  }

  const responseDocStr = await response.text();
  const documentRedirectDestination = await getDocumentRedirectDestination(responseDocStr);
  if (documentRedirectDestination) {
    return {
      redirected: true,
      redirectUrl: documentRedirectDestination
    };
  }

  return { redirected: false };
}
