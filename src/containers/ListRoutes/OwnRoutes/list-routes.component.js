import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header
} from '../list-routes.style';
import {ListRoutes} from '../list-routes.component';


const ListOwnRoutesComponent = ({ history }: Props) => {
  const { t } = useTranslation();

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
        <ListRoutes t={t} history={history} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListOwnRoutesComponent;
