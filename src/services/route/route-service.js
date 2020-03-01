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
}

/**
 * Get route from user
 * @param {String} webId route 
 */
export const get = async (webId) => {
  return RouteFactory.create(await SolidAdapter.get(webId, routeShape));
}

/**
 * Get routes from user
 */
export const getAll = async () => {
}

/**
 * Add message to route
 * @param {String} webId route 
 * @param {Comment} comment
 */
export const publishComment = async (webId, comment) => {
}