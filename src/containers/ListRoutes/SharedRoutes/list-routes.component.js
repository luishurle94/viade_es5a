import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header
} from '../list-routes.style';
import {ListRoutes} from '../list-routes.component';
import { RouteService } from '@services';
import { useNotification } from '@inrupt/solid-react-components';

const ListSharedRoutesComponent = ({ history, webId }: Props) => {
  const { t } = useTranslation();
  const { createNotification } = useNotification(webId);

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
        <ListRoutes t={t} webId={webId} history={history} createNotification={createNotification} getAll={RouteService.getAllShared}/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListSharedRoutesComponent;
