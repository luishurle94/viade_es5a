export const transformTypes = (type, value, beforeValue) => {
  if (type && value && value.toString().trim().length > 0) {
    try {
      const t = type.toString().toLowerCase();
      switch (t) {
        case "number":
          return parseFloat(value);
        case "date":
          return Date.parse(value);
        case "array":
          return beforeValue ? [...beforeValue, value] : [value];
        default:
          return value;
      }
    } catch (e) {
      console.error(e)
    }
  }

  return value;
}