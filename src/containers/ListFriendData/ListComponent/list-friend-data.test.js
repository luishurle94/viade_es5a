import 'jest';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history'
import { FriendDetails } from './list-friend-data.component';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header
} from '../list-friend-data.style';
import {Friend} from '@models'

import { FriendService } from '@services';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


jest.spyOn(FriendService, 'getAll').mockImplementationOnce(() => {
  return Promise.resolve([
    new Friend('https://uo264046.solid.community/profile/card#me', 'Adri', undefined),
    new Friend('https://adrian99.solid.community/profile/card#me', 'Adri99', undefined)
  ])
})

describe('List friends', () => {
  afterAll(cleanup);

  const myFriends = [
    new Friend('https://uo264046.solid.community/profile/card#me', 'Adri', undefined),
    new Friend('https://adrian99.solid.community/profile/card#me', 'Adri99', undefined)
  ];

  const { t } = useTranslation();  
  const history = createMemoryHistory();

  const {container} = render(

    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listFriendData.title')}</p>
        </Header>
        <FriendDetails t={t} webId={'https://uo264046.solid.community/profile/card#me'} history={history} getAll={FriendService.getAll}/>
 
      </TextEditorContainer>
    </TextEditorWrapper>
  );

  test('should render without crashing', () => {
    expect(container).toBeTruthy();
  });
 
  test('all friends must be listed', () => {
    const {getAllByTestId} = render(<FriendDetails t={t} webId={'https://uo264046.solid.community/profile/card#me'} history={history} getAll={FriendService.getAll}/>);
    const routeNames = getAllByTestId('friendName').map(li => li.textContent);
    expect(routeNames.length).toBe(2);
    expect(routeNames).toEqual(myFriends.map(r => r.name));
  });

});

