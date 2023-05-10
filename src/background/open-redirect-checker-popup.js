export const openRedirectCheckerPopup = async (url) => {
  const urlObj = new URL(chrome.runtime.getURL("./popup.html"));

  urlObj.searchParams.set("url", url);

  return await chrome.windows.create({
    type: "popup",
    url: urlObj.href
  });
};
