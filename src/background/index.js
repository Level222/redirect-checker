import { getRedirectDestination } from "./get-redirect-destination";
import { openRedirectCheckerPopup } from "./open-redirect-checker-popup";

const MENU_ID = "check-redirection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Check the redirect destination",
    id: MENU_ID,
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener(({ menuItemId, linkUrl }) => {
  if (menuItemId === MENU_ID && linkUrl) {
    openRedirectCheckerPopup(linkUrl);
  };
});
