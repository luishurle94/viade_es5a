import 'jest';

export default jest.mock('../../../src/utils/storage', () => {

  const getAppStorage = jest.fn(async (webId) => {
    return webId;
  });

  const createInitialFiles = jest.fn(async (url) => {
    return true;
  })

  return {
    getAppStorage,
    createInitialFiles,
  }
});