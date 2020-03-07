/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { successToaster, errorToaster } from '@utils';
import { RouteService } from '@services';
import { Route } from '../../model/index';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Form,
  FullGridSize,
  Label,
  Input,
  TextArea
} from './add-milestone.style';
import MilestoneMap from './MilestoneMap/milestone-map.component';

export const AddMilestone = () => {
  const { t } = useTranslation();

  const [text, setText] = useState('');
  const [Longitudetext, setLongitudeText] = useState('');

  const errors = [false, false, false, false];
  const values = ["R01","",100,5];

  /* Field change handlers */
  function changeLatitudeField(event){
    setText(event.target.value)
  }

  function changeLongitudeField(event){
    setLongitudeText(event.target.value)
  }

  function setLatLng(lat, lng) {
    setText(lat)
    setLongitudeText(lng)
    console.log("Latitud: " + lat)
    console.log("Longitud: " + lng)
  }

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

  function checkAltitude(event) {

    values[3] = event.target.value;
    if(Number.parseInt(event.target.value) < Number.parseInt(event.target.min) ) {
      errorToaster(t('addMilestone.notifications.altitudeNegative'));
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

      let success = await RouteService.add(new Route(id, name, description, distance, slope, rank, String(id), createdAt));

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
        
        <Label>
          <Input type="radio" name={"opcion"} defaultChecked={true}/>
          {t('addMilestone.createNew')}
          <Input type="radio" name={"opcion"} />
          {t('addMilestone.useExistent')}
        </Label>

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
          <b>
            {t('addMilestone.mapInfo')}
          </b>
          <br/>
          <br/>
        </Label>

        <Label>
          {t('addMilestone.latitude')}
          <Input type="number" min="0" max="10" value={text} onChange={changeLatitudeField} size="200"/>
        </Label>

        <Label>
          {t('addMilestone.longitude')}
          <Input type="number" min="0" max="10" value={Longitudetext} onChange={changeLongitudeField} size="200"/>
        </Label>

        <Label>
          {t('addMilestone.altitude')}
          <Input type="number" min="0" defaultValue={5} onBlur={checkAltitude} size="200"/>
        </Label>

        <Input type="button" className="ids-link-filled ids-link-filled--primary button" value={t('addRoute.submit')} onClick={checkSubmit}/>
            
        <MilestoneMap setLatLng={setLatLng}/>

      </FullGridSize>
    </Form>
  );
};


/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const AddMilestoneComponent = () => {
  const { t } = useTranslation();
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('addMilestone.title')}</p>
        </Header>
        <AddMilestone/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default AddMilestoneComponent;
