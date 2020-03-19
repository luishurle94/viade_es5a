
import { Image, Video } from './media';

export default class Milestone {
  webId = '';

  images = [];
  videos = [];

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

  /**
   * 
   * @param {Image} image 
   */
  linkImge(image) {
    if (image && image instanceof Image) {
      this.images.push(image);
    }
  }

  /**
   * 
   * @param {Video} video 
   */
  linkVideo(video) {
    if (video && video instanceof Video) {
      this.videos.push(video);
    }
  }

  getIdentifier() {
    return `${this.name}_${this.latitude}_${this.longitude}`;
  }

}