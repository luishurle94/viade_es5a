export default class Media {
  webId = '';

  /**
   * 
   * @param {String} href 
   * @param {any} body 
   * @param {String} createdAt 
   * @param {String} createdBy 
   * @param {String} mimeType 
   */
  constructor(href, body, createdAt, createdBy, mimeType) {
    this.href = href;
    this.body = body;
    if (createdAt) {
      this.createdAt = new Date(createdAt).toISOString()
    } else {
      this.createdAt = new Date().toISOString()
    }
    this.createdBy = createdBy;
    this.mimeType = mimeType;
  }

  get galleryObject() {
    return {
      "previewImageSrc": this.href,
      "thumbnailImageSrc": this.href,
      "alt": `${this.createdAt} - ${this.createdBy}`,
      "title": `${this.href.split('/').pop()}`
    }
  }

  getIdentifier() {
    return `${this.href}_${this.createdBy}_${this.mimeType}`;
  }

}