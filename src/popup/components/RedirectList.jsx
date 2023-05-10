export const RedirectList = ({ redirectDestinations }) => {
  return (
    <ol>
      {redirectDestinations.map((url, index) => <li key={index}>{url}</li>)}
    </ol>
  );
};
