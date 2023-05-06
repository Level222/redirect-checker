import { hasOffscreenDocument } from "./has-offscreen-document";

const OFFSCREEN_DOCUMENT_PATH = "/offscreen.html";

const createOffscreenDocument = () => {
  return chrome.offscreen.createDocument({
    url: chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH),
    reasons: ["DOM_PARSER"],
    justification: "parse dom to get redirect destination of document"
  });
};

export const getDocumentRedirectDestination = async (docStr) => {
  if (!await hasOffscreenDocument(OFFSCREEN_DOCUMENT_PATH)) {
    await createOffscreenDocument();
  }

  return await chrome.runtime.sendMessage({
    type: "get-document-redirect-destination",
    data: docStr
  });
};
