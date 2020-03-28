import routeShape from '@contexts/route-shape.json';
import mediaShape from '@contexts/media-shape.json';
import { RouteService } from '@services';
import { SolidAdapter } from "@solid-services";
import { MediaFactory } from "@factories";
/**
 * Add image
 * @param {String} routeId 
 * @param {Media} media 
 */
export const addMedia = async (routeId, media) => {
  if (!media) {
    return false;
  }
  // get route
  const route = await RouteService.get(routeId);
  if (!route) {
    return false;
  }

  // upload file
  const uploadFile = await SolidAdapter.createFile(media.href, media.body, media.mimeType);
  if (!uploadFile) {
    return false;
  }

  //create ttl file
  const res = await SolidAdapter.create(media, mediaShape, true, media.createdBy);
  if (!res && !res.added) {
    return false;
  }

  const field = routeShape.shape.filter(s => s.object === 'media').pop();
  const predicate = await SolidAdapter.getPredicate(field, routeShape);

  await SolidAdapter.link(route.webId, res.webId, false, predicate);
  return true;
}

/**
 * Get media (ttl file) from webid
 * @param {String} webId media 
 */
export const get = async (webId) => {
  return MediaFactory.create(await SolidAdapter.get(webId, mediaShape));
}

export const getHref = (webId, filename) => {
  return webId && `${webId.split('/profile')[0]}/${process.env.REACT_APP_VIADE_PATH}media/${filename}`;
}