import { Friend } from "@models";

export const create = (friend) => {
  if (!friend) {
    return undefined;
  }

  let obj = new Friend();

  if(friend.webId) obj.webId = friend.webId;
  if(friend.name) obj.name = friend.name;
  if(friend.image) obj.image = friend.image;

  return obj;
}