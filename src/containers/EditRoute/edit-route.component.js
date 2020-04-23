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
import {TabView,TabPanel} from 'primereact/tabview';
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
  DistanceHelper
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
  Button
} from './edit-route.style';
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

type Props = { history: any };

export const EditRoute = ({ history, routeId }: Props) =>{

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

  function routeDetails() {
    history.push(`/route-details?routeId=${routeId}`);
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

      distance = DistanceHelper.calculateDistance(latitude, longitude, previousLat, previousLong)

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
        if(route && route.milestonesObject){
            route.milestonesObject.sort((a, b) => a.order >  b.order);
            setRenderedMilestones(route.milestonesObject);
            setSize(route.milestonesObject.length);

        }
      }         

    } catch(error) {
      errorToaster(t('addMilestone.notifications.errorLoadingMilestones'));
      console.error(error)
    }

  }

  return ( 
    <Form>
      {!isLoading && 
        <FullGridSize>
          <Title>
              {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile') }
              <br/>
          </Title>
        </FullGridSize>
      }
      <FullGridSize>
          <Accordion id="accordionId" activeIndex="0">
                      {renderedMilestones.filter(m => m).sort((a, b) => a.order - b.order).map(function(milestone, key){
                          return <AccordionTab key={key} header= {milestone.name || milestone.order + 1}> 
                                    { milestone.description && <p> <b>{t('addMilestone.description') + ': '}</b> {milestone.description}</p> }
                                    { milestone.distance && <p> <b>{t('addMilestone.distance') + ': '}</b> {milestone.distance}</p> }
                                    <p> <b>{t('addMilestone.altitude') + ': '}</b> {milestone.slope}</p> 
                                    <p> <b>{t('addMilestone.latitude') + ': '}</b> {milestone.latitude}</p> 
                                    <p> <b>{t('addMilestone.longitude') + ': '}</b> {milestone.longitude}</p> 
                                  </AccordionTab>;
                      })}
          </Accordion>
          
      </FullGridSize>

      <FullGridSize>
        <Label>
          {t('addMilestone.routeToAdd') }

          <Input id="routeToAddId" type="text" size="200" value={routeId} onChange={changeRouteId} />
          <br/>
          <div><Button data-testid="details" className="button, block" label="Details" onClick={() => routeDetails()}>{t('addMilestone.seeRouteDetails')}</Button></div>
          <br/>
        </Label>

        <Label>
          <Input id="radio1Id" data-testid="radio1Id" type="radio" name={"opcion"} checked={!creatingNew} onChange={optionChange} />
          <b>{t('addMilestone.useExistent')}</b>
          <Input id="existentId" type="text" size="200" value={Existenttext} onChange={changeExistentField} disabled={creatingNew} />
          <br />

          <Input id="radio2Id" data-testid="radio2Id" type="radio" name={"opcion"} checked={creatingNew} onChange={optionChange} />
          <b>{t('addMilestone.createNew')}</b>
        </Label>

      </FullGridSize>

      <FullGridSize>

        <Label>
          {t('addMilestone.name') + '*'}
          <Input id="nameId" data-testid="nameId" type="text" size="200" value={Nametext} onChange={changeNameField} disabled={!creatingNew} />
        </Label>

        <Label>
          {t('addMilestone.description')}
          <TextArea id="descriptionId" data-testid="descriptionId" value={Descriptiontext} onChange={changeDescription} cols={40} rows={10} disabled={!creatingNew} />
        </Label>

        <Label>
          <b>
            {t('addMilestone.mapInfo')}
          </b>
          <br />
          <br />
        </Label>

        <Label>
          {t('addMilestone.latitude') + '*'}
          <Input id="latitudeId" type="number" data-testid="latitudeId" min="0" max="10" value={text} onChange={changeLatitudeField} size="200" disabled={!creatingNew} />
        </Label>

        <Label>
          {t('addMilestone.longitude') + '*'}
          <Input id="longitudeId" type="number" data-testid="longitudeId" min="0" max="10" value={Longitudetext} onChange={changeLongitudeField} size="200" disabled={!creatingNew} />
        </Label>

        <Label>
          {t('addMilestone.altitude') + '*'}
          <Input id="altitudeId" type="number" data-testid="altitudeId" min="0" value={Altitudetext} onChange={changeAltitudeField} size="200" disabled={!creatingNew} />
        </Label>

        <Input id="submitId" type="button" data-testid="submitId" className="ids-link-filled ids-link-filled--primary button" value={t('addRoute.submit')} onClick={checkSubmit} />

      </FullGridSize>

      <MilestoneMap id="mapId" setLatLng={setLatLng} />

      {isLoading && <Loader absolute />}

    </Form>
  );
};


/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
export const EditRouteComponent = ({ history }: Props) => {

  let routeId = "";

  if (window.location.href.split("?")[1]) {
    const aux = window.location.href.split("?")[1].split("=")[1];
    if (aux !== routeId) {
      routeId = aux;
    }
  }

  const { t } = useTranslation();
  const [ activeIndex, setActiveIndex ] = useState(0);
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('editRoute.title')}</p>
        </Header>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index) }>
          <TabPanel header={t('addMilestone.title')}>
            <EditRoute history={history} routeId={routeId}/>
          </TabPanel>
          <TabPanel header={t('editRoute.upload')}>
            <Form>
              <FullGridSize>
                <FullGridSize>
                  <FileUploader webId={webId} routeId={routeId} t={t} />
                </FullGridSize>
              </FullGridSize>
            </Form>
          </TabPanel>
        </TabView>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default EditRouteComponent;
