import { waitTabLoading } from "./wait-tab-loading";

export const openRedirectCheckerPopup = async (url) => {
  const window = await chrome.windows.create({
    type: "popup",
    url: chrome.runtime.getURL("./popup.html")
  });

  const [tab] = window.tabs;
  const targetTabId = tab.id;

  await waitTabLoading(targetTabId);

  await chrome.tabs.sendMessage(tab.id, {
    type: "set-url",
    data: url
  });
};
