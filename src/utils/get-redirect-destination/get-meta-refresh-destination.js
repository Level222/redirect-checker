export const getMetaRefreshDestination = (doc) => {
  const metaElem = doc.querySelector("meta[http-equiv=refresh][content]");
  if (!metaElem) {
    return null;
  }

  const match = metaElem.content.match(/^\d+;url=(.+)/is);
  if (!match) {
    return null;
  }

  return match[1];
};
