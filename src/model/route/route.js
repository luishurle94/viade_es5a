// @flow
import Comment from '@models';
import Milestone from '@models';
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
    this.createdAt = createdAt || (new Date()).getTime();
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
  /**
   * @return JSON
   */
  getGeoJson() {
    this.refreshMilestones();
    let base = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
            ]
          }
        }
      ]
    }

    for(let m of this.milestonesObject) {
      // access line string
      base.features.geometry.coordinates.push([
        m.latitude,
        m.longitude
      ]);

      base.features.push(this.createPoint(m.latitude, m.longitude));
    }
  }
  /**
   * 
   * @param {Integer} lat 
   * @param {Integer} lon 
   */
  createPoint(lat, lon) {
    return {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          lon,
          lat
        ]
      }
    }
  }
  /** 
   * 
  */
  refreshMilestones() {
    this.milestones.forEach(url => {
      this.milestonesObject.push(MilestoneService.get(url));
    });
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