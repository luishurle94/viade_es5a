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
    return {
      added: false
    };
  }
  // get route
  const route = await RouteService.get(routeId);
  if (!route) {
    return {
      added: false
    };
  }

  //create ttl file
  const field = routeShape.shape.filter(s => s.object === 'messages').pop();
  return await SolidAdapter.create(comment, commentShape, true, null, routeId, route.getIdentifier(), await SolidAdapter.getPredicate(field, routeShape), field.object, false);
}

/**
 * Get comment from webid
 * @param {String} webId comment 
 */
export const get = async (webId) => {
    return CommentFactory.create(await SolidAdapter.get(webId, commentShape));
  }