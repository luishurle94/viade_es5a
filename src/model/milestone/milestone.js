export default class Milestone {
  webId = '';

/**
 * 
 * @param {String} webId 
 * @param {String} name 
 * @param {String} description 
 * @param {number} distance 
 * @param {number} slope 
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {number} order 
 */
  constructor(name, description, distance, slope, latitude, longitude, order) {
    this.name = name;
    this.description = description;
    this.distance = distance;
    this.slope = slope;
    this.latitude = latitude;
    this.longitude = longitude;
    this.order = order;
  }

  getIdentifier() {
    return `${this.name}_${this.latitude}_${this.longitude}`;
  }

}