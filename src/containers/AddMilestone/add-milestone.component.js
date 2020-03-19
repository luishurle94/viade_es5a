/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { successToaster, errorToaster } from '@utils';
import { MilestoneService, RouteService } from '@services';
import { Milestone } from '../../model/index';
import { Loader } from '@util-components';
import {Accordion,AccordionTab} from 'primereact/accordion';

import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Form,
  FullGridSize,
  Label,
  Input,
  TextArea,
  Title
} from './add-milestone.style';
import MilestoneMap from './MilestoneMap/milestone-map.component';

export const AddMilestone = () => {

  let route;
  
  let routeId = "";

  if (window.location.href.split("?")[1]) {
    routeId = window.location.href.split("?")[1].split("=")[1];
  }

  const [renderedMilestones, setRenderedMilestones] = useState([]);
  useEffect(()=> {obtainMilestones();} );
 
  

  const { t } = useTranslation();

  const [text, setText] = useState('');
  const [Longitudetext, setLongitudeText] = useState('');
  const [Altitudetext, setAltitudeText] = useState('');
  const [Nametext, setNameText] = useState('');
  const [Descriptiontext, setDescriptionText] = useState('');
  const [Existenttext, setExistenttext] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [creatingNew, setCreatingNew] = useState(true);

  function changeRouteId(event) {

  }

  function changeNameField(event) {
    setNameText(event.target.value)
  }

  function changeLatitudeField(event) {
    setText(event.target.value)
  }

  function changeLongitudeField(event) {
    setLongitudeText(event.target.value)
  }

  function changeAltitudeField(event) {
    setAltitudeText(event.target.value)
  }

  function changeExistentField(event) {
    setExistenttext(event.target.value)
  }

  function changeDescription(event) {
    setDescriptionText(event.target.value)
  }

  function setLatLng(lat, lng) {
    setText(lat)
    setLongitudeText(lng)
  }

  function optionChange() {
    setCreatingNew(!creatingNew)
  }

  async function checkSubmit() {

    if (routeId.trim() === "") {
      errorToaster(t('addMilestone.notifications.routeIdEmpty'));

    } else if (creatingNew)
      checkCreateNew();
    else
      checkUseExistent();
  }

  async function checkUseExistent() {

    if (Existenttext.trim() === "") {
      errorToaster(t('addMilestone.notifications.existentEmpty'));
      return;
    }

    await MilestoneService.link(routeId, Existenttext);
    successToaster(t('addMilestone.notifications.correct'));
  }

  const isNumber = (n) => n && !isNaN(parseFloat(n)) && !isNaN(n - 0);
  
  async function checkCreateNew() {

    if (!isNumber(Longitudetext)) {
      errorToaster(t('addMilestone.notifications.longitudeNaN'));
      return;
    }

    if (!isNumber(text)) {
      errorToaster(t('addMilestone.notifications.latitudeNaN'));
      return;
    }

    if (Nametext.trim() === "") {
      errorToaster(t('addRoute.notifications.nameEmpty'));
      return;
    }

    if (!isNumber(Altitudetext)) {
      errorToaster(t('addMilestone.notifications.altitudeNaN'));
      return;

    } else if (Number.parseInt(Altitudetext) < 0) {
      errorToaster(t('addMilestone.notifications.altitudeNegative'));
      return;
    }

    setIsLoading(true);

    let name = Nametext;
    let description = Descriptiontext;
    let distance = 0;
    let slope = 0;
    let latitude = text;
    let longitude = Longitudetext;
    let res = await MilestoneService.add(routeId, new Milestone(name, description, distance, slope, latitude, longitude));

    if (res && res.added === true && res.webId) {
      setIsLoading(false);
      successToaster(t('addMilestone.notifications.correct'));

      setNameText('');
      setDescriptionText('');
      setText('');
      setLongitudeText('');
      setAltitudeText('');
    } else {
      setIsLoading(false);
      errorToaster(t('addMilestone.notifications.errorService'));
    }

  }

  async function obtainMilestones(){

    try {
        route = await RouteService.get(routeId);

        if(route.milestonesObject)
          setRenderedMilestones(route.milestonesObject);

    } catch(error) {
      errorToaster(t('addMilestone.notifications.errorLoadingMilestones'));
      console.log(error)
    }

  }

  return ( 
    <Form>  
      <Title>
          {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile') }
          <br/>
      </Title>

      <FullGridSize>
          <Accordion activeIndex="0">
                      {renderedMilestones.map(function(milestone, index){
                          return <AccordionTab header= {milestone.name}> 
                                  <ul>
                                    <li key={ index }> {t('addMilestone.description') + ': '} {milestone.description}</li>
                                    <li key={ index }> {t('addMilestone.distance') + ': '} {milestone.distance}</li> 
                                    <li key={ index }> {t('addMilestone.slope') + ': '} {milestone.slope}</li> 
                                    <li key={ index }> {t('addMilestone.latitude') + ': '} {milestone.latitude}</li> 
                                    <li key={ index }> {t('addMilestone.longitude') + ': '} {milestone.longitude}</li> 
                                  </ul>
                                  </AccordionTab>;
                      })}
          </Accordion>
      </FullGridSize>

      <FullGridSize>

        <Label>
          {t('addMilestone.routeToAdd')}
          <Input id="routeToAddId" type="text" size="200" value={routeId} onChange={changeRouteId} />
        </Label>

        <Label>
          <Input id="radio1Id" type="radio" name={"opcion"} checked={!creatingNew} onChange={optionChange} />
          <b>{t('addMilestone.useExistent')}</b>
          <Input id="existentId" type="text" size="200" value={Existenttext} onChange={changeExistentField} disabled={creatingNew} />
          <br />

          <Input id="radio2Id" type="radio" name={"opcion"} checked={creatingNew} onChange={optionChange} />
          <b>{t('addMilestone.createNew')}</b>
        </Label>

      </FullGridSize>


      <FullGridSize>

        <Label>
          {t('addMilestone.name')}
          <Input id="nameId" type="text" size="200" value={Nametext} onChange={changeNameField} disabled={!creatingNew} />
        </Label>

        <Label>
          {t('addMilestone.description')}
          <TextArea id="descriptionId" value={Descriptiontext} onChange={changeDescription} cols={40} rows={10} disabled={!creatingNew} />
        </Label>

        <Label>
          <b>
            {t('addMilestone.mapInfo')}
          </b>
          <br />
          <br />
        </Label>

        <Label>
          {t('addMilestone.latitude')}
          <Input id="latitudeId" type="number" min="0" max="10" value={text} onChange={changeLatitudeField} size="200" disabled={!creatingNew} />
        </Label>

        <Label>
          {t('addMilestone.longitude')}
          <Input id="longitudeId" type="number" min="0" max="10" value={Longitudetext} onChange={changeLongitudeField} size="200" disabled={!creatingNew} />
        </Label>

        <Label>
          {t('addMilestone.altitude')}
          <Input id="altitudeId" type="number" min="0" value={Altitudetext} onChange={changeAltitudeField} size="200" disabled={!creatingNew} />
        </Label>

        <Input id="submitId" type="button" className="ids-link-filled ids-link-filled--primary button" value={t('addRoute.submit')} onClick={checkSubmit} />

      </FullGridSize>

      <MilestoneMap setLatLng={setLatLng} />

      {isLoading && <Loader absolute />}

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
        <AddMilestone />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default AddMilestoneComponent;
