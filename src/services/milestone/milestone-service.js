import { SolidAdapter } from "@solid-services";
import { MilestoneFactory } from "@services/factories";
import { RouteService } from '@services'

import milestoneShape from '@contexts/milestone-shape.json';
import routeShape from '@contexts/route-shape.json';
/**
 * Add milestone
 * @param {String} routeId 
 * @param {Milestone} milestone 
 * @returns boolean if action is executed sucesfully
 */
export const add = async (routeId, milestone) => {
  // get route
  const route = await RouteService.get(routeId);
  // Only create node and link with route
  const field = routeShape.shape.filter(s => s.object === 'milestones')[0];
  return SolidAdapter.create(milestone, milestoneShape, true, null, routeId, route.getIdentifier(), await SolidAdapter.getPredicate(field, routeShape), field.object);
}

/**
 * Remove milestone from route
 * @param {String} routeId 
 * @param {String} milestoneId 
 */
export const remove = async (routeId, milestoneId) => {
  // get route
  const route = await RouteService.get(routeId);
  if (!route || !route.milestones || !route.milestones.map(m => m.toString()).filter(m => m === milestoneId.toString()).length > 0) {
    return false;
  }

  const resMilestone = await SolidAdapter.remove(milestoneId);
  if (!resMilestone)
    return false;

  // Only create node and link with route
  const field = routeShape.shape.filter(s => s.object === 'milestones')[0];

  const resRoute = await SolidAdapter.unlink(routeId, await SolidAdapter.getPredicate(field, routeShape), milestoneId);
  return resMilestone && resRoute;
}

/**
 * Links an existing milestone with a route
 * @param {String} routeId 
 * @param {Milestone} milestone 
 */
export const link = async (routeId, milestoneId) => {
  const field = routeShape.shape.filter(s => s.object === 'milestones')[0];
  const predicate = await SolidAdapter.getPredicate(field, routeShape);

  await SolidAdapter.link(routeId, milestoneId, false, predicate);
}

/**
 * Get milestone from webid
 * @param {String} webId milestone 
 */
export const get = async (webId) => {
  return MilestoneFactory.create(await SolidAdapter.get(webId, milestoneShape));
}

/**
 * Get routes from user
 * @param {boolean} getData return url or milestone array
 */
export const getAll = async (getData = true) => {
  const list = await SolidAdapter.getAll('milestones');
  // return list with url
  if (!getData) {
    return list;
  }

  // return list with milestone
  const res = [];
  for(let u of list) {
    const r = await get(u);
    res.push(r);
  }
  return res;
}

/**
 * Add image to milestoen
 * @param {String} webId milestone
 * @param {Image} image
 */
export const addImage = async (webId, image) => {
}

/**
 * Add video to milestoen
 * @param {String} webId milestone
 * @param {Video} video
 */
export const addVideo = async (webId, video) => {
}