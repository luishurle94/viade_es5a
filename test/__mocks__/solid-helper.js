import 'jest';
import { HashHelper} from '@utils'

export default jest.mock('../../src/solid/solid-helper', () => {
  let files = [];
  let links = [];

  files.push(HashHelper.hash('soy_una_ruta'))
  files.push(HashHelper.hash('soy_un_hito'))
  files.push(HashHelper.hash('soy_una_imagen'))
  files.push(HashHelper.hash('soy_un_comentario'))

  links.push({
    obj: 'soy_una_ruta',
    webId: HashHelper.hash('soy_una_ruta'),
    predicate: 'schema:name'
  });


  links.push({
    obj: 'soy_un_hito',
    webId: HashHelper.hash('soy_un_hito'),
    predicate: 'foaf:name'
  });
  links.push({
    obj: -10 ,
    webId: HashHelper.hash('soy_un_hito'),
    predicate: 'schema:latitude'
  });
  links.push({
    obj: 10 ,
    webId: HashHelper.hash('soy_un_hito'),
    predicate: 'schema:longitude'
  });
  links.push({
    obj: 11 ,
    webId: HashHelper.hash('soy_un_hito'),
    predicate: 'schema:elevation'
  });

  links.push({
    obj: 'soy_un_hito2',
    webId: HashHelper.hash('soy_un_hito2'),
    predicate: 'foaf:name'
  });
  links.push({
    obj: -11 ,
    webId: HashHelper.hash('soy_un_hito2'),
    predicate: 'schema:latitude'
  });
  links.push({
    obj: 11 ,
    webId: HashHelper.hash('soy_un_hito2'),
    predicate: 'schema:longitude'
  });
  links.push({
    obj: 12 ,
    webId: HashHelper.hash('soy_un_hito2'),
    predicate: 'schema:elevation'
  });


  links.push({
    obj: [HashHelper.hash('soy_un_hito')],
    webId: HashHelper.hash('soy_una_ruta'),
    predicate: 'viade:point'
  });

  links.push({
    obj: [HashHelper.hash('soy_una_imagen')],
    webId: HashHelper.hash('soy_una_ruta'),
    predicate: 'viade:hasMediaAttached'
  });

  links.push({
    obj: [HashHelper.hash('soy_un_comentario')],
    webId: HashHelper.hash('soy_una_ruta'),
    predicate: 'viade:hasComments'
  });

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
      if (!files.includes(webId)) {
        return false;
      }

      const link = links.filter(l => l.webId.toString().includes(webId) && l.predicate.includes(predicate));

      return link.length > 0;
    } catch (e) {
      console.error(e);
    }

  });

  const fetchRawData = jest.fn(async (url, context) => {
    try {
      const res = files.filter(f => f.toString().includes(url));
      if (res && res.length < 0) {
        throw new Error('404');
      }

      return context.shape
        .filter(p => links.map(l => l.predicate).includes(getPredicate(p)))
        .reduce((obj, key) => ({
          ...obj,
          [key.object]: links
            .filter(l => url.toString().includes(l.webId) && l.predicate.includes(getPredicate(key)))
            .map(l => key.type === 'Array' ? l.obj : l.obj.toString())
            .pop()
        }), {});

    } catch (error) {
      throw error;
    }
  });

  const fetchFilesData = jest.fn(async (url) => {
    try {
      const res = files.filter(f => f.toString().includes(url));
      if (res && res.length > 0) {
        return res;
      }
      return ['url1', 'url2']
    } catch (e) {
      throw e;
    }
  });

  const deleteFile = jest.fn(async (url) => {
    try {
      const res = files.map(f => f.toString()).filter(f => f.includes(url.toString()));
      if (res && res.length > 0) {
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

  const createFile = async (webId, body, mimeType) => {
    if (body && body === '404') {
      return false;
    }
    return true;
  }

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
    getFriendData,
    createFile
  }
});