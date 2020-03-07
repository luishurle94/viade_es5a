/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { successToaster, errorToaster } from '@utils';
import { RouteService } from '@services';
import { Route } from '../../model/index';
import ldflex from '@solid/query-ldflex';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Form,
  FullGridSize,
  Label,
  Input,
  TextArea,
  WebId
} from './add-route.style';

type Props = { webId: String };


export const AddRoute = ({ webId }: Props) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const errors = [false, false, false, false];
  const values = ["R01","",100,5];

  async function setUrlFromStorage() {
    if (webId && !url) {
      const storageRoot = await ldflex[webId]['pim:storage'];
      if (storageRoot) {
        const exampleUrl = new URL('/share/some-doc.txt', storageRoot.value);
        setUrl(exampleUrl);
      }
    }
  }

  useEffect(() => {
    setUrlFromStorage();
  }, [webId]);

  /* Field checkers */
  function checkName(event) {

    values[0] = event.target.value.trim();
    if(event.target.value.trim() === ""){
      errorToaster(t('addRoute.notifications.nameEmpty'));
      errors[0] = true;
    } else{
      errors[0] = false;
    }
  
  }

  function checkDescription(event){
    values[1] = event.target.value;
  }

  function checkRank(event) {

    values[3] = event.target.value;
    if(Number.parseInt(event.target.value) < Number.parseInt(event.target.min) 
      || Number.parseInt(event.target.value) > Number.parseInt(event.target.max)) {
      errorToaster(t('addRoute.notifications.rank'));
      errors[3] = true;
    } else{
      errors[3] = false;
    }
  }

  async function checkSubmit(){

    if(errors.includes(true)){

      errorToaster(t('addRoute.notifications.error'));

    } else {

      let id = "webIdDeTest";
      let name = values[0];
      let description = values[1];
      let distance = 0;
      let slope = 0;
      let rank = values[3];
      let createdAt = new Date();

      let success = await RouteService.add(new Route(id, name, description, distance, slope, rank, String(webId), createdAt));

      if(success === true){

        successToaster(t('addRoute.notifications.correct'));

      } else {

        errorToaster(t('addRoute.notifications.errorService'));

      }
    }
    
  }

  return (
    <Form>
      <FullGridSize>

        <WebId>
        
          <Label>
            {t('addRoute.connection')}
          </Label>
          
            <b>
              <a href={webId}>{webId}</a>
            </b>  
        </WebId>

      </FullGridSize>

      <FullGridSize>
        <Label>
          {t('addRoute.name')}
          <Input type="text" size="200" defaultValue="R01" onBlur={checkName} />
        </Label>

          <Label>
            {t('addRoute.description')}
            <TextArea onChange={checkDescription} cols={40} rows={10} />
          </Label>

        <Label>
          {t('addRoute.rank')}
          <Input type="number" min="0" max="10" defaultValue={5} onBlur={checkRank} size="200"/>
        </Label>

        <Input type="button" className="ids-link-filled ids-link-filled--primary button" value={t('addRoute.submit')} onClick={checkSubmit}/>
            
      </FullGridSize>
    </Form>
  );
};


/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const AddRouteComponent = ({ webId }: Props) => {
  const { t } = useTranslation();
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('addRoute.title')}</p>
        </Header>
        <AddRoute webId={webId} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default AddRouteComponent;