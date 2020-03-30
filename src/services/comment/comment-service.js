import routeShape from '@contexts/route-shape.json';
import commentShape from '@contexts/comment-shape.json';
import { RouteService } from '@services';
import { SolidAdapter } from "@solid-services";
import { CommentFactory } from "@factories";

/**
 * Add message to route
 * @param {String} routeId 
 * @param {Comment} comment 
 */
export const publishComment = async (routeId, comment) => {
  if (!comment) {
    return false;
  }
  // get route
  const route = await RouteService.get(routeId);
  if (!route) {
    return false;
  }

  //create ttl file
  const res = await SolidAdapter.create(comment, commentShape, true, comment.createdBy);
  if (!res && !res.added) {
    return false;
  }

  const field = routeShape.shape.filter(s => s.object === 'media').pop();
  const predicate = await SolidAdapter.getPredicate(field, routeShape);

  await SolidAdapter.link(route.webId, res.webId, false, predicate);
  return true;
}

/**
 * Get comment from webid
 * @param {String} webId comment 
 */
export const get = async (webId) => {
    return CommentFactory.create(await SolidAdapter.get(webId, commentShape));
  }