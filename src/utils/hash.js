export const hash = (str) => {
    const string = str.toString();
    let hash = 0, i;
    for (i = 0; i < string.length; i++) {
        hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
    }
  
    return Math.abs(hash);
};