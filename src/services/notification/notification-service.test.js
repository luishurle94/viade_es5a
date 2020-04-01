import 'jest';

import auth from './../../../test/__mocks__/solid-auth-client';
import * as notification from './../../../test/__mocks__/@utils/notification';

import { NotificationService } from '@services';

jest.mock('solid-auth-client');
jest.mock('../../utils/notification')

const notificationContent = {
  title: "N",
  summary: "Notificacion",
  object: "UrlNotification"
};

const notification1 = {
  title: "N1",
  summary: "Notificacion1",
  object: "UrlNotification1",
  read: true
};

const notification2 = {
  title: "N2",
  summary: "Notificacion2",
  object: "UrlNotification2",
  read: false
};

describe.only('Send notification', () => {

  test('should send successfully', async () => {
	  
    expect(await NotificationService.publish(
      async (content, to, type, license) => { }, notificationContent, 'https://isafdez2.solid.community/profile/card#me')).toBeTruthy();
  });

  test('should not send', async () => {
	  
    expect(await NotificationService.publish(
      async (content, to, type, license) => { }, notificationContent, '404')).toBeFalsy();
  })

});

describe.only('Get notifications', () => {
  test('should get successfully', async () => {
    expect((await NotificationService.getNotifications(
      async (inbox) => {}, {originalNotifications: [notification1, notification2]})).length === 2).toBeTruthy();
  })
});

describe.only('Get unread notifications', () => {
  test('should get successfully', async () => {
    expect((await NotificationService.getNotifications(
      async (inbox) => {}, {originalNotifications: [notification1, notification2]})).length).toBe(2);
  })
});