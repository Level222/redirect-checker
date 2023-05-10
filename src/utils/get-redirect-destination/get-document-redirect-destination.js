import { getMetaRefreshDestination } from "./get-meta-refresh-destination";

const parser = new DOMParser();

export const getDocumentRedirectDestination = (docStr) => {
  const doc = parser.parseFromString(docStr, "text/html");
  return getMetaRefreshDestination(doc);
};
