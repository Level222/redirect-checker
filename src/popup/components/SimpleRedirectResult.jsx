export const SimpleRedirectResult = ({ from, to, isLoading }) => {
  const redirectMsg = (() => {
    if (isLoading) {
      return "Loading..."
    }

    if (from === to) {
      return "No redirect";
    }

    return to;
  })();

  return (
    <div>{from}→{redirectMsg}</div>
  );
};
