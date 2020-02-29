
import { Image, Video } from './media';

export default class Milestone {
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
 */
  constructor(webId, name, description, distance, slope, latitude, longitude) {
    this.webId = webId;
    this.name = name;
    this.description = description;
    this.distance = distance;
    this.slope = slope;
    this.latitude = latitude;
    this.longitude = longitude;
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

}