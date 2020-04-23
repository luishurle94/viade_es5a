import { SolidAdapter } from "@solid-services";
import routeShape from '@contexts/route-shape.json';
import sharedRouteShape from '@contexts/shared.route-shape.json';
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
  return await SolidAdapter.remove(webId);
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

  const routeUrls = await diffSharedRoute(async (route) => route);

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

export const saveSharedRoute = async () => {
  diffSharedRoute(async (route) => {
    await SolidAdapter.link('data.ttl', route, sharedRouteShape.shape[0].literal, await SolidAdapter.getPredicate(sharedRouteShape.shape[0], sharedRouteShape))
  });
}

const diffSharedRoute = async (callback) => {
  // from notifications
  const notifications = await SolidAdapter.getAll('/inbox');
  let routeUrls = [];
  for(let notification of notifications) {
    const webId = await NotificationService.get(notification);
    if (routeUrls.indexOf(webId.url) < 0) {
      const res = await callback(webId.url);
      if (res) {
        routeUrls.push(webId.url);
      }
    }
  }

  // from persistance
  const persistance = await SolidAdapter.get('data.ttl', sharedRouteShape);
  if (persistance && persistance.url) {
    for(let route of persistance.url) {
      if (routeUrls.indexOf(route) < 0) {
        routeUrls.push(route);
      } 
    }
  }
  return routeUrls;
}

/**
 * Share routes from user
 * @param {boolean} getData return url or milestone array
 */
export const share = async (route, friendId) => {
  if (!route || !friendId || !route.webId) {
    return false;
  }
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

export const removeShared = async (webId) => {
  const res = await SolidAdapter.unlink('data.ttl', await SolidAdapter.getPredicate(sharedRouteShape.shape[0], sharedRouteShape), webId);
  if (!res) {
    return false;
  }

  const notifications = await SolidAdapter.getAll('/inbox');
  for(let notification of notifications) {
    const res = await NotificationService.get(notification);
    if (res && res.url && res.url === webId) {
      return SolidAdapter.remove(notification);
    }
  }
  return true;
}