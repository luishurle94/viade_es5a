import { Milestone } from "../../../model";

export const create = (milestone) => {
  if (!milestone) {
    return undefined;
  }

  let obj = new Milestone();

  if(milestone.webId) obj.webId = milestone.webId;
  if(milestone.name) obj.name = milestone.name;
  if(milestone.description) obj.description = milestone.description;
  if(milestone.distance) obj.distance = milestone.distance;
  if(milestone.slope) obj.slope = milestone.slope;
  if(milestone.latitude) obj.latitude = milestone.latitude;
  if(milestone.longitude) obj.longitude = milestone.longitude;
  if(milestone.order) obj.order = milestone.order;

  return obj;
}