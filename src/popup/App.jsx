import { useState } from "react";

export const App = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "set-url") {
        setUrl(message.data);
      }
    });
  }, []);

  return (
    <RedirectChecker url={url} />
  );
};
