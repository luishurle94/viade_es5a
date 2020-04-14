import React from 'react';
import { useTranslation } from 'react-i18next';
import { FriendService } from '@services';
import { FriendDetails } from "./ListComponent/list-friend-data.component";
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header
} from './list-friend-data.style';
import { useNotification } from '@inrupt/solid-react-components';

export const ListFriendsData = ({ history, webId }: Props) => {
  const { t } = useTranslation();
  const { createNotification } = useNotification(webId);

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listFriendData.title')}</p>
        </Header>
        <FriendDetails t={t} webId={webId} history={history} createNotification={createNotification} getAll={FriendService.getAll}/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListFriendsData;