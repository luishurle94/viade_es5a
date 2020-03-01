import { Route } from "../../model";

export const create = (route) => {
  let obj = new Route();

  if(route.webId) obj.webId = route.webId;
  if(route.name) obj.name = route.name;
  if(route.description) obj.description = route.description;
  if(route.distance) obj.distance = route.distance;
  if(route.slope) obj.slope = route.slope;
  if(route.rank) obj.rank = route.rank;
  if(route.createdBy) obj.createdBy = route.createdBy;
  if(route.createdAt) obj.createdAt = route.createdAt;
  if(route.messages) obj.messages = route.messages;
  if(route.milestones) obj.milestones = route.milestones;

  return obj;
}