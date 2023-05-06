export const getMetaRefreshDestination = (doc) => {
  const metaElem = doc.querySelector("meta[http-equiv=refresh][content]");
  if (!metaElem) {
    return false;
  }

  const match = metaElem.content.match(/^\d+;url=(.+)/is);
  if (!match) {
    return null;
  }

  return match[1];
};
