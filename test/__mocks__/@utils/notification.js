import 'jest';

export default jest.mock('./../../../src/utils/notification', () => {

  const sendNotification = jest.fn(async (opponent, content, createNotification, to) => {
    try {
      if (to) {
        return createNotification(content, to);
      }
      if (content && content === '404')
        throw new Error('404');
      /**
       * If the opponent doesn't have an inbox, show an error
       */
      throw new Error('Error: The opponent does not have an available inbox');
    } catch (error) {
      throw new Error(error);
    }
  })

  const findUserInboxes = jest.fn(async paths => {
    
      let inboxes = [
        {
          path: "https://isafdezpe.solid.community/profile/card#me",
          name: "Global"
        },
        {
          path: "https://isafdezpe.solid.community/profile/card#me",
          name: "Local"
        }
      ];

      if (paths && paths[0].path === '404')
        throw new Error('404');
      return inboxes;
  })

  const getDefaultInbox = jest.fn((inboxes, inbox1, inbox2) =>
    inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2)
  )
  
  return {
    sendNotification,
	findUserInboxes,
	getDefaultInbox
  }

})

