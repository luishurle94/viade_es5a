import { Notification } from '@models';

const date = new Date().getTime();
const notification = new Notification('Isabel',
  'Javier', 'Notificación de prueba', date, true);

describe.only('Create a new notification', () => {
  test('should create succesfully', async () => {
    expect(notification.from === 'Isabel').toBe(true);
    expect(notification.to === 'Javier').toBe(true);
    expect(notification.message === 'Notificación de prueba').toBe(true);
    expect(notification.date === date).toBe(true);
    expect(notification.read).toBe(true);
  });

  test('should return false because file has been created', () => {
    const fail = new Notification();
    expect(fail.from).toBe(undefined);
    expect(fail.to).toBe(undefined);
    expect(fail.message).toBe(undefined);
    expect(fail.date).toBe(undefined);
    expect(fail.read).toBe(false);
  });
});