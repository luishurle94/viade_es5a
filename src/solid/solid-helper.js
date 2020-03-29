
import { SolidTypesHelper } from '@solid-services';
import { ldflexHelper, storageHelper } from '@utils';
import { namedNode, literal } from '@rdfjs/data-model';
import ldflex from '@solid/query-ldflex';
import auth from 'solid-auth-client';
import FC from 'solid-file-client';

let isCreatedStructure = false;
export const createInitialStructure = async (webId) => {
  isCreatedStructure = isCreatedStructure || await storageHelper.createInitialFiles(webId);
  return isCreatedStructure;
}

export const createAndGetDocument = async (url, createDocument) => {
  return !createDocument ? await ldflexHelper.resourceExists(url) : await ldflexHelper.createNonExistentDocument(url);
}

export const link = async (webId, obj, lit, filename, folder, predicate) => {
  try {
    let url = `${await getAppPathStorage(webId)}${folder}${filename}`;
    if (!await ldflexHelper.resourceExists(url))
      return false;
    await linkToGraph(url, obj, lit, predicate);
    return true;
  } catch (e) {
    return false
  }
}

export const linkToGraph = async (webId, obj, lit, predicate) => {
  try {
    const insert = lit ? literal(obj) : namedNode(obj);
    await ldflex[webId][predicate].add(insert);
  } catch (e) {
    throw e
  }

}

export const unlink = async (webId, predicate, url) => {
  try {
    if (!await ldflexHelper.resourceExists(webId))
      return false;

    await ldflex[webId][predicate].remove(namedNode(url));
    return true;
  } catch (e) {
    return false;
  }

}

export const fetchRawData = async (url, context) => {
  try {
    const obj = await ldflexHelper.fetchLdflexDocument(url);
    if (!obj) throw new Error('404');

    let data = {};
    data.webId = url;
    for await (const field of context.shape) {
      for await (const fieldData of obj[getPredicate(field, context)]) {
        data = {
          ...data, [field.object]: fieldData && field.type &&
            SolidTypesHelper.transformTypes(field.type, fieldData.value, data[field.object])
        };
      }
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchFilesData = async (url) => {
  try {
    const fc = new FC(auth);
    let response = await fc.readFolder(url);
    if (response && response.type === 'folder' && response.itemType === 'Container') {
      return response.files.filter(f => f.type === 'text/turtle' && !['data.ttl', 'settings.ttl'].includes(f.name)).map(f => f.url);
    }
  } catch (e) {
    throw e;
  }
}

export const deleteFile = async (url) => {
  try {
    const fc = new FC(auth);
    if (!await ldflexHelper.resourceExists(url))
      return false;

    let deleteFile = await fc.deleteFile(url);
    if (deleteFile.ok)
      return true;

    return false;
  } catch (e) {
    throw e;
  }
}

export const getAppPathStorage = async (webId) => {
  return await storageHelper.getAppStorage(webId);
}

export const getPredicate = (field, context) => {
  const prefix = context['@context'][field.prefix];
  return `${prefix}${field.predicate}`;
}

export const getFriends = async (webId) => {
  const me = ldflex[webId];
  let friends = [];
  for await (const name of me.friends) {
    friends.push(await getFriendData(name));
  }
  return friends;
}

export const getFriendData = async (webId) => {
  let friend = {};
  let data = ldflex[webId];
  friend.fn = `${await data.vcard_fn}`;
  friend.webId = `${await data["solid:account"]}`.concat("profile/card#");
  friend.image = `${await data["vcard:hasPhoto"]}`;
  return friend;
}

export const createFile = async (webId, body, mimeType) => {
  try {
    await ldflexHelper.createDocumentWithMimeType(webId, body, mimeType);
    return true;
  } catch (e) {
    return false;
  }
}