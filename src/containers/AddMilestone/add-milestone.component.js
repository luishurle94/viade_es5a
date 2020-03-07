/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { successToaster, errorToaster } from '@utils';
import { MilestoneService } from '@services';
import { Milestone } from '../../model/index';
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

  let queryString = "";

  if(window.location.href.split("?")[1]){
      queryString = window.location.href.split("?")[1].split("=")[1];
  }

  const { t } = useTranslation();

  const [text, setText] = useState('');
  const [Longitudetext, setLongitudeText] = useState('');
  const [Altitudetext, setAltitudeText] = useState('');
  const [Nametext, setNameText] = useState('');
  const [Descriptiontext, setDescriptionText] = useState('');
  const [Existenttext, setExistenttext] = useState('');

  const [creatingNew, setCreatingNew] = useState(true);
  const [routeId, setRouteId] = useState(queryString);

  function changeRouteId(event){
    setRouteId(event.target.value)
  }

  function changeNameField(event){
    setNameText(event.target.value)
  }

  function changeLatitudeField(event){
    setText(event.target.value)  
  }

  function changeLongitudeField(event){
    setLongitudeText(event.target.value)
  }

  function changeAltitudeField(event){
    setAltitudeText(event.target.value)
  }

  function changeExistentField(event){
    setExistenttext(event.target.value)
  }

  function changeDescription(event){
    setDescriptionText(event.target.value)
  }

  function setLatLng(lat, lng) {
    setText(lat)
    setLongitudeText(lng)
  }

  function optionChange(){
    setCreatingNew(!creatingNew)
  }

  async function checkSubmit(){

    if(routeId.trim() === ""){
      errorToaster(t('addMilestone.notifications.routeIdEmpty'));

    } else if(creatingNew)
      checkCreateNew();
    else 
      checkUseExistent();
  }

  async function checkUseExistent(){

      if(Existenttext.trim() === "")
        errorToaster(t('addMilestone.notifications.existentEmpty'));
  }

  async function checkCreateNew(){

    let error = false;

    if(!parseInt(Longitudetext)){
      errorToaster(t('addMilestone.notifications.longitudeNaN'));
      error = true;
    }

    if(!parseInt(text)){
      errorToaster(t('addMilestone.notifications.latitudeNaN'));
      error = true;
    }

    if(Nametext.trim() === ""){
      errorToaster(t('addRoute.notifications.nameEmpty'));
      error = true;
    }

    if(!parseInt(Altitudetext)){
      errorToaster(t('addMilestone.notifications.altitudeNaN'));
      error = true;

    } else if(Number.parseInt(Altitudetext) < 0) {
      errorToaster(t('addMilestone.notifications.altitudeNegative'));
      error = true;
    }

    if(error){

      errorToaster(t('addRoute.notifications.error'));

    } else {

      let id = "webIdDeTest";
      let name = Nametext;
      let description = Descriptiontext;
      let distance = 0;
      let slope = 0;
      let latitude = text;
      let longitude = Longitudetext;

      let success = await MilestoneService.add(routeId, new Milestone(id, name, description, distance, slope, latitude, longitude));

      if(success === true){

        successToaster(t('addMilestone.notifications.correct'));

      } else {

        errorToaster(t('addMilestone.notifications.errorService'));

      }
    }
    
  }

  return (
    <Form>
      <FullGridSize>
        
      <Label>
          {t('addMilestone.routeToAdd')}
          <Input type="text" size="200" value={routeId} onChange={changeRouteId}/>
      </Label>

        <Label>
          <Input type="radio" name={"opcion"} checked={!creatingNew} onChange={optionChange}/>
          <b>{t('addMilestone.useExistent')}</b>
          <Input type="text" size="200" value={Existenttext} onChange={changeExistentField} disabled={creatingNew}/>
          <br/>
          
          <Input type="radio" name={"opcion"} checked={creatingNew} onChange={optionChange} />
          <b>{t('addMilestone.createNew')}</b>
        </Label>

      </FullGridSize>


      <FullGridSize>

        <Label>
          {t('addMilestone.name')}
          <Input type="text" size="200" value={Nametext} onChange={changeNameField} disabled={!creatingNew}/>
        </Label>

        <Label>
          {t('addMilestone.description')}
          <TextArea value={Descriptiontext} onChange={changeDescription} cols={40} rows={10} disabled={!creatingNew}/>
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
          <Input type="number" min="0" max="10" value={text} onChange={changeLatitudeField} size="200" disabled={!creatingNew}/>
        </Label>

        <Label>
          {t('addMilestone.longitude')}
          <Input type="number" min="0" max="10" value={Longitudetext} onChange={changeLongitudeField} size="200" disabled={!creatingNew}/>
        </Label>

        <Label>
          {t('addMilestone.altitude')}
          <Input type="number" min="0" value={Altitudetext} onChange={changeAltitudeField} size="200" disabled={!creatingNew}/>
        </Label>

        <Input type="button" className="ids-link-filled ids-link-filled--primary button" value={t('addRoute.submit')} onClick={checkSubmit}/>

      </FullGridSize>


      <MilestoneMap setLatLng={setLatLng}/>

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
