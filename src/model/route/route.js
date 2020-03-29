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
    return `${this.name}_${this.description}_${this.createdBy}`;
  }

  async refreshMilestones() {
    const newList = [];
    for(let i = 0; i < this.milestones.length; i++){
      newList.push(await MilestoneService.get(this.milestones[i]));
      if (!this.distance)
        distance += this.milestonesObject[i].distance;
      if (!this.slope) {
        if (i > 0) 
          slope = Math.abs(this.milestonesObject[i] - this.milestonesObject[i-1]);
      }
    };
    if (newList.length > 0) {
      this.milestonesObject = newList;
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