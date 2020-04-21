import { SolidAdapter } from "@solid-services";
import { FriendFactory } from "@factories";
import auth from 'solid-auth-client';

import friendShape from '@contexts/friend-shape.json';

/**
 * Get friend from webid
 * @param {String} webId friend 
 */
export const get = async (webId) => {
  return FriendFactory.create(await SolidAdapter.get(webId, friendShape));
}

/**
 * Get friends of user
 * @param {boolean} getData
 */
export const getAll = async (getData = true) => {
  const session = await auth.currentSession();

  const list = await SolidAdapter.getFriends(session.webId);

  if (!getData)
    return list;

  const res = [];
  for(let u of list) {
    const r = await get(u.webId);
    if(r){
      res.push(r);
    }
      
  }
  return res;
}

/**
 * Add friend
 * @param {String} friendWebId friend 
 * @param {String} webId me
 * @returns boolean if action is exectuted sucesfully
 */
export const add = async (friendWebId, webId) => {
    try {
      return await SolidAdapter.link(webId, friendWebId, false, 'knows');
    } catch(e){
      console.log(e)
    }
    
}