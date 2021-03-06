/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { successToaster, errorToaster } from '@utils';
import { RouteService } from '@services';
import { Route } from '@models';
import { Loader } from '@util-components';
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

type Props = { webId: String, history: any };

export const AddRoute = ({ webId, history }: Props) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  function checkRank(event){
    values[3] = event.target.value;
  }

  async function checkSubmit(event){
    event.preventDefault();

    if(errors.includes(true)){
      errorToaster(t('addRoute.notifications.error'));
    } else {
      let name = values[0];
      let description = values[1];
      let distance = 0;
      let slope = 0;
      let rank = values[3];

      const route = new Route(name, description, distance, slope, rank, webId)
      
      setIsLoading(true);

      let res = await RouteService.add(route);

      if(res && res.added === true && res.webId){
        setIsLoading(false);
        successToaster(t('addRoute.notifications.correct'));
        history.push(`/route-edit?routeId=${res.webId}`);

      } else {
        setIsLoading(false);
        errorToaster(t('addRoute.notifications.errorService'));
      }
    }
    
  }

  return (
    <Form id="formId" onSubmit={checkSubmit}>
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
          {t('addRoute.name') + '*'}
          <Input id="nameId" data-testid="nameId" type="text" size="200" defaultValue="" onBlur={checkName} />
        </Label>

          <Label>
            {t('addRoute.description') + '*'}
            <TextArea id="descriptionId" data-testid="descriptionId"  onChange={checkDescription} cols={40} rows={10} required={true} />
          </Label>

        <Label>
          {t('addRoute.rank')}
          <Input id="rankId" data-testid="rankId" type="number" min="0" max="10" size="200" onChange={checkRank}/>
        </Label>

        <Input id="submitId" data-testid="submitId" type="submit" className="ids-link-filled ids-link-filled--primary button" value={t('addRoute.submit')} />
            
      </FullGridSize>
      {isLoading && <Loader absolute />}
    </Form>
  );
};


/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const AddRouteComponent = ({ webId, history }: Props) => {
  const { t } = useTranslation();
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p className={'header'}>{t('addRoute.title')}</p>
        </Header>
        <AddRoute webId={webId} history={history} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};



export default withRouter(AddRouteComponent);
