
import { AccessControlList } from '@inrupt/solid-react-components';
import auth from 'solid-auth-client';
import { HashHelper } from '@utils';
import * as SolidHelper from './solid-helper'

/**
 * Create new node in graph
 * @param {Model} obj add object with getIdentifier() implemented
 * @param {*} context jsonld context {prefix, predicate}
 * @param {String} webId user
 * @param {String} parentWebId parent webId
 */
export const create = async (obj, context, createDocumentP, webIdP, parentWebIdP, parentFilenameP, parentPredicateP, folderP) => {
  try {
    const {createDocument, webId, parentWebId, parentFilename, parentPredicate, folder} = await checkParams(createDocumentP, webIdP, parentWebIdP, parentFilenameP, parentPredicateP, folderP);    

    // check if structure is created
    if (await SolidHelper.createInitialStructure(webId)) {
      return insert(obj, context, createDocument, obj.getIdentifier(), webId, parentWebId, parentFilename, parentPredicate, folder);
    }    
  } catch (e) {
    console.log(e)
  }
  
  return false;
}

export const insert = async (obj, context, createDocumentP, filename, webIdP, parentWebIdP, parentFilenameP, parentPredicateP, folderP) => {
  const {createDocument, webId, parentWebId, parentFilename, parentPredicate, folder} = await checkParams(createDocumentP, webIdP, parentWebIdP, parentFilenameP, parentPredicateP,folderP);    

  const appPath = await SolidHelper.getAppPathStorage(webId);
  const path = `${HashHelper.hash(filename)}.ttl`;
  const documentUri = `${appPath}${folder}${path}`;

  // get graph
  const newDocument = await SolidHelper.createAndGetDocument(documentUri, createDocument);
  if (!newDocument) {
    return false;
  }

  // if document is ok, continue
  if (newDocument.ok) {
    for await (const field of context.shape) {
        const data = obj[field.object];
        await SolidHelper.addToGraph(webId, data, field.literal, path, folder, SolidHelper.getPredicate(field, context));
    }
    
    // create link with parent. IT CAN'T BE A LITERAL, IT'S A REFERENCE
    await SolidHelper.addToGraph(parentWebId, documentUri, false, parentFilename, '', parentPredicate);

    // check insert
    const res = await SolidHelper.fetchRawData(documentUri, context);

    return res !== null && res !== undefined;
  }
}

export const remove = async (webId) => {
  return await SolidHelper.deleteFile(webId);
}

export const unlink = async(webId, predicate, url) => {
  return await SolidHelper.removeToGraph(webId, predicate, url);
}

/**
 * Get object from POD
 * @param {String} webId 
 */
export const get = async (webId, context) => {
  try {
    return await SolidHelper.fetchRawData(webId, context);
  } catch (e) {
    console.error(e)
    return undefined;
  }
}

export const getAll = async (folder) => {
  try {
    folder = folder || '';

    const webId = await currentUserId();
    const appPath = await SolidHelper.getAppPathStorage(webId);
    const documentsUri = `${appPath}${folder}`;

    return await SolidHelper.fetchFilesData(documentsUri);
  } catch (e) {
    console.error(e)
    return [];
  }
}

export const share = async (webId, friendId, shareUrl) => {
  try {
    const permissions = [
    {
        agents: [friendId],
        modes: [AccessControlList.MODES.READ, AccessControlList.MODES.WRITE]
    }
    ];
    const ACLFile = new AccessControlList(webId, shareUrl);
    await ACLFile.createACL(permissions);
    return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}

export const currentUserId = async () => {
  try {
    const session = await auth.currentSession();
    return session.webId;
  } catch (e) {
    throw e;
  }
}

export const getPredicate = async (field, context) => {
  return SolidHelper.getPredicate(field, context);
}

const checkParams = async (createDocument, webId, parentWebId, parentFilename, parentPredicate, folder) => {
  createDocument = createDocument || true;
  folder = folder || '';
  if (folder.length > 0 && !folder.includes('/'))  folder = `${folder}/`;
  
  webId = webId || await currentUserId();
  parentWebId = parentWebId || await currentUserId();

  if (parentFilename) {
    if ((typeof parentFilename === 'string' && !parentFilename.includes('.ttl')) || (typeof parentFilename === 'number')) {
      parentFilename = HashHelper.hash(parentFilename);
    } 
  } else {
    parentFilename = 'data';
  }
  if (parentFilename && !parentFilename.toString().includes('.ttl'))  parentFilename = `${parentFilename}.ttl`
  parentPredicate = parentPredicate || 'schema:hasPart';
  return {createDocument, webId, parentWebId, parentFilename, parentPredicate, folder};
}