import { waitTabLoading } from "./wait-tab-loading";

export const openRedirectCheckerPopup = async (url) => {
  const window = await chrome.windows.create({
    type: "popup",
    url: chrome.runtime.getURL("./popup.html")
  });

  const [tab] = await chrome.tabs.query({ windowId: window.id });
  const targetTabId = tab.id;

  await waitTabLoading(targetTabId);

  await chrome.tabs.sendMessage(tab.id, {
    type: "set-url",
    data: url
  });
};
