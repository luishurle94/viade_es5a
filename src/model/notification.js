
export default class Notification {
  /**
   * 
   * @param {String} from 
   * @param {String} to 
   * @param {String} message 
   * @param {Date} date 
   * @param {boolean} read 
   */
  constructor(from, to, message, date, read) {
    this.from = from;
    this.to = to;
    this.message = message;
    this.date = date;
    this.read = read || false;
  }
}