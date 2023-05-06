import { getMetaRefreshDestination } from "./get-meta-refresh-destination";

const parser = new DOMParser();

const getDocumentRedirectDestination = (docStr) => {
  const doc = parser.parseFromString(docStr, "text/html");
  return getMetaRefreshDestination(doc);
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "get-document-redirect-destination") {
    sendResponse(getDocumentRedirectDestination(message.data));
  }
});
