// @flow
import { MilestoneService, MediaService, CommentService } from '@services';
import { GeoJsonHelper } from '@utils'

export default class Route {
  // TODO 
  webId = '';

  // lazy
  messages = [];
  milestones = [];
  media = [];

  // objects
  messagesObject = [];
  milestonesObject = [];
  mediaObject = [];

  /**
   * 
   * @param {String} name 
   * @param {String} description 
   * @param {number} distance 
   * @param {number} slope 
   * @param {number} rank 
   * @param {String} createdBy 
   * @param {Date} createdAt 
   */
  constructor(name, description, distance, slope, rank, createdBy, createdAt) {
    this.name = name;
    this.description = description;
    this.distance = distance;
    this.slope = slope;
    this.rank = rank;
    this.createdBy = createdBy;
    if (createdAt) {
      this.createdAt = new Date(createdAt).toISOString()
    } else {
      this.createdAt = new Date().toISOString();
    }
  }

  /**
   * 
   * @param {Comment} comment 
   */
  linkComment(comment) {
    if (comment) {
      this.messages.push(comment);
    }
  }

  /**
   * 
   * @param {Milestone} milestone 
   */
  linkMilestone(milestone) {
    if (milestone) {
      this.milestones.push(milestone);
    }
  }

  /**
   * 
   * @param {Media} media 
   */
  linkMedia(media) {
    if (media) {
      this.media.push(media);
    }
  }

  /**
   * @return JSON
   */
  async getGeoJson() {
    await this.refreshMilestones();
    let base = GeoJsonHelper.getBase();

    for (let m of this.milestonesObject) {
      // add coordinates line
      GeoJsonHelper.createLine(base, m.latitude, m.longitude);
      // add marker
      GeoJsonHelper.createMarker(base, m.latitude, m.longitude);
    }
    return base;
  }


  getIdentifier() {
    if (this.name && this.description && this.createdBy)
      return `${this.name}_${this.description}_${this.createdBy}`;

    return undefined;
  }

  async refreshMilestones() {
    const newList = [];
    let distance = 0;
    let slope = 0;
    for(let i = 0; i < this.milestones.length; i++){
      newList.push(await MilestoneService.get(this.milestones[i]));
      if (newList.length > i) {
        distance += newList[i].distance;
        if (i > 0)  {
          slope += Math.abs(newList[i].slope - newList[i - 1].slope);
        }
      }
    };
    if (newList.length > 0) {
      this.milestonesObject = newList;
      this.distance = distance;
      this.slope = slope;
    }
    return this.milestonesObject;
  }

  async refreshMedia() {
    const newList = [];
    for(let url of this.media){
      newList.push(await MediaService.get(url));
    };
    if (newList.length > 0) {
      this.mediaObject = newList;
    }
    return this.mediaObject;
  }

  async refreshComments() {
    const newList = [];
    for(let url of this.messages){
      newList.push(await CommentService.get(url));
    };
    if (newList.length > 0) {
      this.messagesObject = newList;
    }
    return this.messagesObject;
  }

}