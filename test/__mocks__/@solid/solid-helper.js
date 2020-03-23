
let folders = []
let files = [];
let links = [];

let isCreatedStructure = false;
export const createInitialStructure = async (webId) => {
  isCreatedStructure = isCreatedStructure || true;
  if (!isCreatedStructure) {
    folders.push(webId);
  }
  return isCreatedStructure;
}

export const createAndGetDocument = async (url, createDocument) => {
  return {};
}

export const link = async (webId, obj, lit, filename, folder, predicate) => {
  let url = `${await getAppPathStorage(webId)}${folder}${filename}`;
  await linkToGraph(url,obj,lit,predicate);
}

export const linkToGraph = async (webId, obj, lit, predicate) => {
    if (!files.includes(webId))

    links.push({obj: obj, webId: webId});
}

export const unlink = async (webId, predicate, url) => {
  try {
    if (files.includes(webId))
      return false;

    return true;
  } catch (e) {
    console.error(e);
  }
  
}

export const fetchRawData = async (url, context) => {
  try {
    if (files.includes(url)) {
        throw new Error('404');
    }
    const obj = {}

    let data = {};
    data.webId = url;

    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchFilesData = async (url) => {
 try {
     for(const u of folders) {
         if (u.includes(url)) {
            return ['url1', 'url2']
         }
     }
     return ['url1', 'url2']
 } catch(e) {
  throw e;
 }
}

export const deleteFile = async (url) => {
  try {
    if (files.includes(url)) {
        return true;
    }

    return false;
  } catch (e) {
      throw e;
  }
}

export const getAppPathStorage = async (webId) => {
    return 'https://jaluma.inrupt.net/';
}

export const getPredicate = (field, context) => {
    return `${field.prefix}${field.predicate}`;
}

export const getFriends = async (webId) => {
    let friends = [];
    for await (const name of ['Pepito', 'Manolito']) {
      friends.push(await getFriendData(name));
    }
    return friends;
}

export const getFriendData = async (webId) => {
    let friend = {};
    friend.fn = webId;
    friend.webId = 'https://jaluma.inrupt.net/profile/card#me';
    friend.image = 'https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg';
    return friend;
}