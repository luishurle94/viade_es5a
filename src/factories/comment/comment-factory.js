import { Comment } from "@models";

export const create = (comment) => {
  if (!comment) {
    return undefined;
  }

  let obj = new Comment();

  if(comment.webId) obj.webId = comment.webId;
  if(comment.message) obj.message = comment.message;
  if(comment.createdAt) obj.createdAt = comment.createdAt;
  if(comment.createdBy) obj.createdBy = comment.createdBy;

  return obj;
}