export default (obj: any) => {
  return (o: any) => {
    return Object.keys(obj).reduce((prev, k) => {
      const validator = obj[k];
      if (validator) {
        prev[k] = validator(o[k]);
      }
      return prev;
    }, {});
  };
};
