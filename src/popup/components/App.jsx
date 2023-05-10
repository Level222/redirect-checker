import { RedirectChecker } from "./RedirectChecker";

export const App = () => {
  const url = new URLSearchParams(location.search).get("url");

  return (
    <RedirectChecker url={url} />
  );
};
