import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { FriendService } from '@services';
import { successToaster, errorToaster } from '@utils';
import { FriendDetails } from "./ListComponent/list-friend-data.component";
import { Dialog } from 'primereact/dialog';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Button,
  MainButton,
  DialogContent,
  Input
} from './list-friend-data.style';
import { useNotification } from '@inrupt/solid-react-components';

export const ListFriendsData = ({ history, webId }: Props) => {
  const { t } = useTranslation();
  const { createNotification } = useNotification(webId);
  const [isVisible, setVisible] = useState(false);
  const [getFriendUrl, setFriendUrl] = useState("");
  const [getFriendList, setFriendList] = useState(FriendService.getAll(true));

  const isValidUrl = (string) => {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }

  function renderFriendsDialog() {
      return (
        <DialogContent>
          <Input id="nameId" data-testid="nameId" type="text" size="200" defaultValue="" onBlur={(event) => setFriendUrl(event.target.value.trim())} />
          <Button data-testid="send" className="button" label="send" onClick={sendButton.bind(ListFriendsData)}>{t('listFriendData.addButton')}</Button>
        </DialogContent>
      );

  }
  
  function getFriends(){
    setFriendList(FriendService.getAll(true));
  }

  async function sendButton(){
  
    if(isVisible && isValidUrl(getFriendUrl)){

      try {
        await FriendService.add(getFriendUrl, webId).then(setVisible(false));
        getFriends();
        successToaster(t('listFriendData.success'));

      } catch {
        errorToaster(t('listFriendData.error'))
      }
    } else {
        errorToaster(t('listFriendData.invalidUrl'));
    }


  }

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listFriendData.title')}</p>
        </Header>
        <MainButton data-testid="send" className="button" label="send" onClick={() => setVisible(true)}>{t('listFriendData.add')}</MainButton>
        <Dialog header={t('listFriendData.addTitle')} visible={isVisible} width="225px" modal={true} onHide={() => setVisible(false)}>
          {renderFriendsDialog()}
        </Dialog>
        <FriendDetails t={t} webId={webId} history={history} createNotification={createNotification} getAll={getFriendList}/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListFriendsData;