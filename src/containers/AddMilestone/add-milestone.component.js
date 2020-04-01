/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Accordion,
  AccordionTab,
} from 'primereact/accordion';
import { useTranslation } from 'react-i18next';
import auth from 'solid-auth-client';

import { FileUploader } from '@components';
import { Milestone } from '@models';
import {
  MilestoneService,
  RouteService,
} from '@services';
import { Loader } from '@util-components';
import {
  errorToaster,
  successToaster,
} from '@utils';

import {
  Form,
  FullGridSize,
  Header,
  Input,
  Label,
  TextArea,
  TextEditorContainer,
  TextEditorWrapper,
  Title,
} from './add-milestone.style';
import MilestoneMap from './MilestoneMap/milestone-map.component';

let route;

var webId;


if (!webId) {
  auth.currentSession().then(res => {
    if (res) {
      webId = res.webId
    }
  });
}

export const AddMilestone = () => {
  
  let routeId = "";

  if (window.location.href.split("?")[1]) {
    const aux = window.location.href.split("?")[1].split("=")[1];
    if (aux !== routeId) {
      routeId = aux;
    }
  }

  const [renderedMilestones, setRenderedMilestones] = useState([]);
  const [size, setSize] = useState(0);
  useEffect(()=> {obtainMilestones()});
 
  

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
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
          dist = dist * 1.609344
      return dist;
    }
  }

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
    let latitude = text;
    let longitude = Longitudetext;
    let altitude = Altitudetext;
    let previousLat = 0;
    let previousLong = 0;

    if(size > 0 && renderedMilestones[size -1]){

      if(renderedMilestones[size -1].latitude)
        previousLat = renderedMilestones[size -1].latitude;

      if(renderedMilestones[size -1].longitude)
        previousLong = renderedMilestones[size -1].longitude;

      distance = calculateDistance(latitude, longitude, previousLat, previousLong)

    }
      
    let res = await MilestoneService.add(routeId, new Milestone(name, description, distance, altitude, latitude, longitude, size + 1));

    if (res && res.added === true && res.webId) {
      route = null;
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
      if (!route) {
        route = await RouteService.get(routeId, false);
        console.log(route)
        if(route && route.milestonesObject){
            route.milestonesObject.sort((a, b) => a.order >  b.order);
            setRenderedMilestones(route.milestonesObject);
            setSize(route.milestonesObject.length);

        }
      }         

    } catch(error) {
      errorToaster(t('addMilestone.notifications.errorLoadingMilestones'));
      console.log(error)
    }

  }

  return ( 
    <Form>
      {!isLoading && 
      <FullGridSize>
        <FullGridSize>
          <h5>
              {t('file.dropzone.upload') }
              <br/>
          </h5>
          <FileUploader webId={webId} routeId={routeId} t={t} />
        </FullGridSize>

        <Title>
            {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile') }
            <br/>
        </Title>
      </FullGridSize>
      }
      <FullGridSize>

          <Accordion activeIndex="0">
                      {renderedMilestones.filter(m => m).sort((a, b) => a.order - b.order).map(function(milestone, key){
                          return <AccordionTab key={key} header= {milestone.name || milestone.order + 1}> 
                                    { milestone.description && <p> {t('addMilestone.description') + ': '} {milestone.description}</p> }
                                    { milestone.distance && <p> {t('addMilestone.distance') + ': '} {milestone.distance}</p> }
                                    <p> {t('addMilestone.altitude') + ': '} {milestone.slope}</p> 
                                    <p> {t('addMilestone.latitude') + ': '} {milestone.latitude}</p> 
                                    <p> {t('addMilestone.longitude') + ': '} {milestone.longitude}</p> 
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
