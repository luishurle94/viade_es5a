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
    this.image = image;
  }

  getIdentifier() {
    if (this.name && this.webId)
      return `${this.name}_${this.webId}`;

    return undefined;
  }

}