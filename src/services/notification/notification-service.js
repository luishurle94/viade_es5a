import { notification } from '@utils';
import { NotificationTypes } from '@inrupt/solid-react-components';
import auth from 'solid-auth-client';
import { SolidAdapter } from "@solid-services";
import inboxShape from '@contexts/inbox-shape.json';

/**
 * Publish message
 * @param {*} content 
 * @param {String} webId receiver user 
 */
export const publish = async (createNotification, content, webId, type, url) => {
  try {
    type = type || NotificationTypes.ANNOUNCE;
    url = url || `${window.location.href}`;

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
        target: url
      }, to.path, type, license);
    }
    
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const get = async (webId) => {
  return await SolidAdapter.get(webId, inboxShape);
}

/**
 * Get notifications
 * @param {*} fetchNotification loads notifications
 * @param {*} notificationH stores notifications
 */
export const getNotifications = async (fetchNotification, notificationH) => {
  const session = await auth.currentSession();
  const inbox = await notification.findUserInboxes([
    { path: session.webId, name: 'Global' }
  ]);
  
  await fetchNotification(inbox);
  return notificationH.originalNotifications;
}

/**
 * Get unread notifications
 * @param {*} fetchNotification loads notifications
 * @param {*} notificationH stores notifications
 */
export const getUnreadNotifications = async (fetchNotification, notificationH) => {
  return (await getNotifications(fetchNotification, notificationH)).filter(notification => notification.read === false);
}
