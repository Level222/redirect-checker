import { PromiseExtensionListener } from "@utils/promise-extension-listener";

const extensionUrlOrigin = chrome.runtime.getURL("").replace(/\/$/, "");

const requestPromiseListener = new PromiseExtensionListener(
  chrome.webRequest.onBeforeRequest,
  { types: ["xmlhttprequest"], urls: ["<all_urls>"] }
);

const getNextFetchRequestId = async (url) => {
  const [details] = await requestPromiseListener.nextOccurs();

  if (details.initiator === extensionUrlOrigin && details.url === url) {
    return details.requestId;
  }

  return await getNextFetchRequestId();
};


const redirectPromiseListener = new PromiseExtensionListener(
  chrome.webRequest.onBeforeRedirect,
  { types: ["xmlhttprequest"], urls: ["<all_urls>"] }
);

const getNextRedirectDestination = async (requestId) => {
  const [details] = await redirectPromiseListener.nextOccurs();

  if (details.requestId === requestId) {
    return details.redirectUrl;
  }

  return await getNextRedirectDestination();
};


export const getNextFetchRedirectDestination = async (url) => {
  const requestId = await getNextFetchRequestId(url);
  return await getNextRedirectDestination(requestId);
};
