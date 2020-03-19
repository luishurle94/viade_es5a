
import { Image } from './media';

export default class Friend {
  webId = '';

/**
 * 
 * @param {String} webId 
 * @param {String} name 
 * @param {Image} image
 */
  constructor(name, image) {
    this.name = name;
    if (image && image instanceof Image) {
        this.image = image;
      }
  }

}