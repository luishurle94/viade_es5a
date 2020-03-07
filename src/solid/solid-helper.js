
import { SolidTypesHelper } from './../solid';
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

export const addToGraph = async (webId, obj, lit, filename, folder, predicate) => {
  const insert = lit ? literal(obj) : namedNode(obj);
  await ldflex[`${await getAppPathStorage(webId)}${folder}${filename}`][predicate].add(insert);
}

export const removeToGraph = async (webId, predicate, url) => {
  try {
    if (!await ldflexHelper.resourceExists(webId))
      return false;

    await ldflex[webId][predicate].remove(namedNode(url));
    return true;
  } catch (e) {
    console.error(e);
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
          data = { ...data, [field.object]: fieldData && field.type &&
            SolidTypesHelper.transformTypes(field.type, fieldData.value, data[field.object]) };
        }
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchFilesData = async (url) => {
 try {
  const fc   = new FC( auth );
  let response = await fc.readFolder(url);
  if (response && response.type === 'folder' && response.itemType === 'Container') {
    console.log(response)
    return response.files.filter(f => f.type === 'text/turtle').map(f => f.url);
  }
 } catch(e) {
  throw e;
 }
}

export const deleteFile = async (url) => {
  try {
    const fc   = new FC( auth );
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