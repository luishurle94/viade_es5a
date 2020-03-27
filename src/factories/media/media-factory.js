import { Media } from "@models";

export const create = (media) => {
  if (!media) {
    return undefined;
  }

  let obj = new Media();

  if(media.webId) obj.webId = media.webId;
  if(media.href) obj.href = media.href;
  if(media.body) obj.body = media.body;
  if(media.createdAt) obj.createdAt = media.createdAt;
  if(media.createdBy) obj.createdBy = media.createdBy;
  if(media.mimeType) obj.mimeType = media.mimeType;

  return obj;
}