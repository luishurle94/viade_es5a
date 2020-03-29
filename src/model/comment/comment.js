export default class Comment {
  webId = '';

  /**
   * 
   * @param {String} message 
   * @param {String} createdAt 
   * @param {String} createdBy 
   */
  constructor(message, createdAt, createdBy) {
    this.message = message;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

  getIdentifier() {
    return `${this.message}_${this.createdBy}`;
  }

}