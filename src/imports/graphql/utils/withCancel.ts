const withCancel = (asyncIterator, onCancel) => {
  const asyncReturn = asyncIterator.return;
  const ai = asyncIterator;

  ai.return = () => {
    onCancel();
    return asyncReturn ? asyncReturn.call(asyncIterator)
      : Promise.resolve({ value: undefined, done: true });
  };

  return ai;
};
export default withCancel;
