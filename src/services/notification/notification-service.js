import { notification } from '@utils';
import { NotificationTypes } from '@inrupt/solid-react-components';
import auth from 'solid-auth-client';


/**
 * Publish message
 * @param {*} content 
 * @param {String} webId receiver user 
 */
export const publish = async (createNotification, content, webId, type) => {
  try {
    type = type || NotificationTypes.ANNOUNCE;

    const session = await auth.currentSession();

    const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

    const inboxes = await notification.findUserInboxes([
      { path: webId, name: 'Global' }
    ]);

    if (inboxes.length === 0)
      return false;

    const to = notification.getDefaultInbox(inboxes, 'Global');

    if (to) {
      await createNotification({
        title: content.title,
        summary: content.summary,
        actor: session.webId,
        object: content.url,
        target: window.location.href
      }, to.path, type, license);
    }
    
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Get notifications
 */
export const getNotifications = async (fetchNotification, useLiveUpdate) => {
  const session = await auth.currentSession();
  const inbox = await notification.findUserInboxes([
    { path: session.webId, name: 'Global' }
  ]);
  
  await fetchNotification(inbox);
}

/**
 * Get unread notifications
 */
export const getUnreadNotifications = async (fetchNotification) => {
  return getNotifications(fetchNotification).filter(notification => notification.read === false);
}
