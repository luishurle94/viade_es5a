import { SolidAdapter } from "@solid-services";
import routeShape from '@contexts/route-shape.json';
import { RouteFactory } from '@factories';
import { NotificationService } from '@services';

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
export const get = async (webId, lazyLoadingMilestones = true, lazyLoadingMedia = true, lazyLoadingComments = true) => {
  const route = RouteFactory.create(await SolidAdapter.get(webId, routeShape));
  if (route) {
    if (!lazyLoadingMilestones) {
      await route.refreshMilestones();
    }
    if(!lazyLoadingMedia) {
      await route.refreshMedia();
    }
    if (!lazyLoadingComments) {
      await route.refreshComments();
    }
  }
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
    if (r && r.getIdentifier())
      res.push(r);
  }
  return res;
}

export const getAllShared = async (getData = true) => {
  const list = await SolidAdapter.getAll('/inbox');
  let routeUrls = [];
  for(let notification of list) {
    routeUrls.push(await NotificationService.get(notification));
  }
  routeUrls = routeUrls.map(r => r.url);
  // return list with url
  if (!getData) {
    return routeUrls;
  }

  // return list with routes
  const res = [];
  for(let u of routeUrls) {
    const r = await get(u);
    if (r && r.getIdentifier())
      res.push(r);
  }
  return res;
}

/**
 * Share routes from user
 * @param {boolean} getData return url or milestone array
 */
export const share = async (route, friendId) => {
  const routeRes = await SolidAdapter.share(friendId, route.webId);
  if (routeRes) {
    // share linked elements
    for (let milestone of route.milestones) {
      await SolidAdapter.share(friendId, milestone);
    }
    for (let media of route.media) {
      await SolidAdapter.share(friendId, media);
    }
    for (let comment of route.messages) {
      await SolidAdapter.share(friendId, comment);
    }
    return true;
  }
  return false;
}