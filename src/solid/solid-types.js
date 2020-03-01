export const transformTypes = (type, value) => {
  if (type && value) {
    try {
      const t = type.toLowerCase();
      switch (t) {
        case "number":
          return parseFloat(value);
        case "date":
          // return epoach time
          return parseInt(value);
        case "array":
          //TODO
          return [value];
        default:
          return value;
      }
    } catch (e) {
      console.log(e)
    }
  }

  return value;
}