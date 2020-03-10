// @flow
import Comment from './comment';
import Milestone from './milestone';
import { MilestoneService } from '@services';

export default class Route {
  // TODO 
  webId = '';

  messages = [];
  milestones = [];
  milestonesObject = [];

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
    this.createdAt = createdAt || (new Date).getTime();
  }

  /**
   * 
   * @param {Comment} comment 
   */
  linkComment(comment) {
    if (comment && comment instanceof Comment) {
      this.messages.push(comment);
    }
  }

  /**
   * 
   * @param {Milestone} milestone 
   */
  linkMilestone(milestone) {
    if (milestone && milestone instanceof Milestone) {
      this.milestones.push(milestone);
    }
  }

  getIdentifier() {
    return `${this.name}_${this.createdBy}`;
  }

  getObjectsMilestones = async () => {
    let distance = 0;
    let slope = 0;
    for (let i = 0; i < this.milestones.length; i++) {
      this.milestonesObject.push(await MilestoneService.get(this.milestones[i]));
      if (!this.distance)
        distance += this.milestonesObject[i].distance;
      if (!this.slope) {
        if (i > 0) 
          slope = Math.abs(this.milestonesObject[i] - this.milestonesObject[i-1]);
      }
    }
    this.distance = distance;
    this.slope = slope;
  }

}