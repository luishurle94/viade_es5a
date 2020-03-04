
import { SolidTypesHelper } from './../solid';
import { ldflexHelper, storageHelper } from '@utils';
import { namedNode, literal } from '@rdfjs/data-model';
import ldflex from '@solid/query-ldflex';
const auth = require('solid-auth-cli')
const FC   = require('solid-file-client')
const fc   = new FC( auth )

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
  // unlink in graph
}

export const fetchRawData = async (url, context) => {
  try {
    const obj = await ldflexHelper.fetchLdflexDocument(url);
    if (!obj) throw new Error('404');

    let data = {};
    data.webId = url;
    for await (const field of context.shape) {
        const fieldData = await obj[getPredicate(field, context)];
        data = { ...data, [field.object]: await fieldData && field.type && SolidTypesHelper.transformTypes(field.type, await fieldData.value) };
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchFilesData = async (url) => {
 try {
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