export default class Comment {
  /**
   * 
   * @param {String} webId 
   * @param {String} message 
   * @param {String} createdBy 
   * @param {Date} createdAt 
   */
  constructor(webId, message, createdBy, createdAt) {
    this.webId = webId;
    this.message = message;
    this.createdBy = createdBy;
    this.createdAt = createdAt ? createdBy : Date.now();
  }

}