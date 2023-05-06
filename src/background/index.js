import { getRedirectDestination } from "./get-redirect-destination";

const MENU_ID = "check-redirection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Check the redirect destination",
    id: MENU_ID,
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener(async ({ menuItemId, linkUrl }) => {
  if (menuItemId !== MENU_ID || !linkUrl) {
    return;
  };

  console.group();
  for (let i = 0; i < 10; i++) {
    const redirect = await getRedirectDestination(linkUrl);
    if (redirect.redirected) console.log(linkUrl = redirect.redirectUrl);
    else break;
  }
  console.groupEnd();
});
