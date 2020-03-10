// @flow
import Comment from './comment';
import Milestone from './milestone';
import { MilestoneService } from '@services';

export default class Route {
  messages = [];
  milestones = [];
  milestonesObjects = [];

  /**
   * 
   * @param {String} webId 
   * @param {String} name 
   * @param {String} description 
   * @param {number} distance 
   * @param {number} slope 
   * @param {number} rank 
   * @param {String} createdBy 
   * @param {Date} createdAt 
   */
  constructor(webId, name, description, distance, slope, rank, createdBy, createdAt) {
    this.webId = webId;
    this.name = name;
    this.description = description;
    this.distance = distance;
    this.slope = slope;
    this.rank = rank;
    this.createdBy = createdBy;
    this.createdAt = createdAt || Date.now();
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

    for(let m of this.milestonesObjects) {
      this.createPoint(m.latitude, m.longitude);
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
      this.milestonesObjects.push(MilestoneService.get(url));
    });
  }

  ejemplo(){
    return {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -5.850943922996521,
                43.35589397969254
              ],
              [
                -5.851303339004517,
                43.35510997685353
              ],
              [
                -5.850740075111388,
                43.35470041910396
              ],
              [
                -5.849431157112122,
                43.354552197522914
              ],
              [
                -5.848755240440369,
                43.35480963477412
              ],
              [
                -5.848492383956909,
                43.355371312258654
              ],
              [
                -5.850890278816223,
                43.35590178066491
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -5.850901007652283,
              43.35591738260667
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "marker-color": "#7e7e7e",
            "marker-size": "medium",
            "marker-symbol": ""
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              -5.848234891891479,
              43.35578476597392
            ]
          }
        }
      ]
    }
  }
}