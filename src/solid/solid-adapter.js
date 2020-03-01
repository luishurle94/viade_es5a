
import { AccessControlList } from '@inrupt/solid-react-components';
import { ldflexHelper } from '@utils';
import auth from 'solid-auth-client';
import { HashHelper } from '@utils';
import * as SolidHelper from './solid-helper'

/**
 * Create new node in graph
 * @param {*} obj add
 * @param {*} context jsonld context {prefix, predicate}
 * @param {String} webId user
 * @param {String} filename 
 * @param {String} parentWebId parent webId
 */
export const create = async (obj, context, webId, parentWebId) => {
  try {
    parentWebId = parentWebId || await currentUserId();

    if (await SolidHelper.createInitialStructure(webId)) {
      const appPath = await SolidHelper.getAppPathStorage(webId);
      const path = `${HashHelper.hash(obj.name)}.ttl`;
      const documentUri = `${appPath}${path}`;

      const newDocument = await ldflexHelper.createNonExistentDocument(documentUri);
  
      if (!newDocument) {
        return false;
      }
  
      if (newDocument.ok) {
        for await (const field of context.shape) {
            const data = obj[field.object];
            await SolidHelper.addToGraph(webId, data, field.literal, path, SolidHelper.getPredicate(field, context));
        }

        // link with parent
        await SolidHelper.addToGraph(parentWebId, documentUri);

        // check insert
        const res = await SolidHelper.fetchRawData(documentUri, context);

        return res !== null && res !== undefined;
      }
    }    
    console.log(webId)
  } catch (e) {
    console.log(e)
    return false;
  }
  
  return false;
}

export const remove = async (webId) => {
}

/**
 * Get object from POD
 * @param {String} webId 
 */
export const get = async (webId, context) => {
  try {
    return await SolidHelper.fetchRawData(webId, context);
  } catch (e) {
    console.log(e)
    return undefined;
  }
}

export const getAll = async () => {
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
    console.log(e)
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