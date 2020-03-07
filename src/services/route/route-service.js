import { SolidAdapter } from "../../solid";
import routeShape from '@contexts/route-shape.json';
import { RouteFactory } from '../factories';

/**
 * Add route
 * @param {Route} route 
 * @returns boolean if action is exectuted sucesfully
 */
export const add = async (route) => {
  return SolidAdapter.create(route, routeShape, true, route.createdBy);
}

/**
 * Remove route from user
 * @param {String} webId route 
 */
export const remove = async (webId) => {
  return SolidAdapter.remove(webId);
}

/**
 * Get route from user
 * @param {String} webId route 
 */
export const get = async (webId) => {
  const route = RouteFactory.create(await SolidAdapter.get(webId, routeShape));
  await route.getObjectsMilestones();
  return route;
}

/**
 * Get routes from user
 * @param {boolean} getData return url or milestone array
 */
export const getAll = async (getData = true) => {
  const list = await SolidAdapter.getAll();
  // return list with url
  if (!getData) {
    return list;
  }

  // return list with routes
  const res = [];
  for(let u of list) {
    const r = await get(u);
    res.push(r);
  }
  return res;
}

/**
 * Add message to route
 * @param {String} webId route 
 * @param {Comment} comment
 */
export const publishComment = async (webId, comment) => {
}