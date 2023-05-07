import { PromiseExtensionListener } from "./promise-extension-listener";

const updatePromiseListener = new PromiseExtensionListener(chrome.tabs.onUpdated);

const waitTabLoadedEvent = async (targetTabId) => {
  const [tabId, changeInfo] = await updatePromiseListener.nextOccurs();

  if (tabId !== targetTabId || changeInfo.status !== "complete") {
    return await waitTabLoadedEvent(targetTabId);
  }
};

export const waitTabLoading = async (tabId) => {
  const tab = await chrome.tabs.get(tabId);
  if (!tab) throw new TypeError("Invalid tab id");

  if (tab.status !== "complete") {
    return await waitTabLoadedEvent(tabId);
  }
};
