export const promiseAnyValue = (map) => {
  const promises = [...map].map(
    ([key, promise]) => promise.then((result) => [key, result])
  );
  return Promise.any(promises);
};
