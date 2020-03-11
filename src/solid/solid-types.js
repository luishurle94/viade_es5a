export const transformTypes = (type, value, beforeValue) => {
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
          return beforeValue ? [...beforeValue, value] : [value];
        default:
          return value;
      }
    } catch (e) {
      console.log(e)
    }
  }

  return value;
}