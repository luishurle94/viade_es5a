import 'jest';


export default jest.mock('../../src/solid/solid-helper', () => {
  let files = [];
  let links = [];
// throw new Error(9)
  const createInitialStructure = jest.fn(async (webId) => {
    return true;
  });
  
  const createAndGetDocument = jest.fn(async (url, createDocument) => {
    if (!files.includes(url)) {
      files.push(url);
      return {
        ok: "soy_un_ok"
      };
    }
  })
  
  const link = jest.fn(async (webId, obj, lit, filename, folder, predicate) => {
    let url = `${filename}`;
    await linkToGraph(url, obj, lit, predicate);
  });
  
  const linkToGraph = jest.fn(async (webId, obj, lit, predicate) => {
    if (obj) {
      links.push({
        obj: obj,
        webId: webId,
        predicate: predicate
      });
    }
  });
  
  const unlink = jest.fn(async (webId, predicate, url) => {
    try {
      if (files.includes(webId)) {
        return false;
      }
  
      const link = links.filter(l => l.webId.includes(url) && l.predicate.includes(predicate));

      return link.length > 0;
    } catch (e) {
      console.error(e);
    }
    
  });
  
  const fetchRawData = jest.fn(async (url, context) => {
    try {
      if (!files.includes(url)) {
          throw new Error('404');
      }
      
      return context.shape
        .filter(p => links.map(l => l.predicate).includes(getPredicate(p)))
        .reduce((obj, key) => ({
          ...obj,
          [key.object]: links
                          .filter(l => url.includes(l.webId) && l.predicate.includes(getPredicate(key)))
                          .map(l => l.obj)
                          .pop()
        }), {});

    } catch (error) {
      throw error;
    }
  });
  
  const fetchFilesData = jest.fn(async (url) => {
   try {
       for(const u of files) {
           if (u.includes(url)) {
              return links.filter(l => l.webId.includes(url)).map(l => l.obj);
           }
       }
       return ['url1', 'url2']
   } catch(e) {
    throw e;
   }
  });
  
  const deleteFile = jest.fn(async (url) => {
    try {
      if (files.includes(url)) {
        files.splice(files.indexOf(url), 1);
        return true;
      }
  
      return false;
    } catch (e) {
        throw e;
    }
  });
  
  const getAppPathStorage = jest.fn(async (webId) => {
      return 'https://jaluma.inrupt.net/';
  })
  
  const getPredicate = jest.fn((field, context) => {
      return `${field.prefix}:${field.predicate}`;
  });
  
  const getFriends = jest.fn(async (webId) => {
      let friends = [];
      for await (const name of ['Pepito', 'Manolito']) {
        friends.push(await getFriendData(name));
      }
      return friends;
  })
  
  const getFriendData = jest.fn(async (webId) => {
      let friend = {};
      friend.fn = webId;
      friend.webId = 'https://jaluma.inrupt.net/profile/card#me';
      friend.image = 'https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg';
      return friend;
  })

  return {
    createInitialStructure,
    createAndGetDocument,
    link,
    linkToGraph,
    unlink,
    fetchRawData,
    fetchFilesData,
    deleteFile,
    getAppPathStorage,
    getPredicate,
    getFriends,
    getFriendData
  }
});