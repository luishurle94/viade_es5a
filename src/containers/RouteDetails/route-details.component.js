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

import { RouteService } from '@services';
import { Loader } from '@util-components';
import { errorToaster } from '@utils';

import {
  Form,
  FullGridSize,
  Header,
  TextEditorContainer,
  TextEditorWrapper,
  Title,
} from './route-details.style';
import RouteDetailsMap from './RouteDetailsMap/index';

const flexStyle = {
  'display': 'flex',
  'flexDirection': 'row',
  'height': '100%',
  'width': '100%',
  'position': 'relative',
};


export const RouteDetails = () => {

  let route;
  
  let routeId = "";

  if (window.location.href.split("?")[1]) {
    routeId = window.location.href.split("?")[1].split("=")[1];
  }

  const [renderedName, setRenderedName] = useState('');
  const [renderedDescription, setRenderedDescription] = useState('');
  const [renderedDistance, setRenderedDistance] = useState(0);
  const [renderedSlope, setRenderedSlope] = useState(0);
  const [renderedRank, setRenderedRank] = useState('');
  const [renderedCreatedBy, setRenderedCreatedBy] = useState('');
  const [renderedCreatedAt, setRenderedCreatedAt] = useState('');

  const [mapLat, setMapLat] = useState(40.416775);
  const [mapLng, setMapLng] = useState(-3.703790);

  const [renderedMilestones, setRenderedMilestones] = useState([]);
  useEffect(()=> {obtainMilestones();});

  const { t } = useTranslation();

  const [isLoading] = useState(false);

  async function obtainMilestones(){

    try {
        route = await RouteService.get(routeId);

        setRenderedName(route.name);
        setRenderedDescription(route.description);

        if(Number(route.distance))
          setRenderedDistance(route.distance);

        if(Number(route.slope))
          setRenderedSlope(route.slope);

        setRenderedRank(route.rank);
        setRenderedCreatedBy(route.createdBy);

        if(route.createdAt)
          setRenderedCreatedAt(new Date(Number(route.createdAt)).toLocaleDateString().toString());

        if(route.milestonesObject){
            route.milestonesObject.sort((a, b) => (a.order >  b.order) ? 1 : -1);
            setRenderedMilestones(route.milestonesObject);
            
        }
          

    } catch(error) {
      errorToaster(t('addMilestone.notifications.errorLoadingMilestones'));
      console.log(error)
    }

  }

  function updateMarker(milestone){
    let lat = renderedMilestones[milestone.index].latitude;
    let lng = renderedMilestones[milestone.index].longitude;
    if(lat && lng){
      setMapLat(lat);
      setMapLng(lng);
    }
  }

  return ( 
    <Form>  
      
    <div style={flexStyle}>
      <div>
        <FullGridSize> 
            <Title id="tituloRuta">
              {t('routeDetails.title')}
              <br/>
            </Title>
            <p> {t('addMilestone.name') + ': '} {renderedName}</p>
            <p> {t('addMilestone.description') + ': '} {renderedDescription}</p>
            <p> {t('addMilestone.distance') + ': '} {renderedDistance}</p>
            <p> {t('addMilestone.slope') + ': '}{renderedSlope}</p>
            <p> {t('addRoute.rank') + ': '} {renderedRank}</p>
            <p> {t('addRoute.creator') + ': '} {renderedCreatedBy}</p>
            <p> {t('addRoute.createdAt') + ': '} {renderedCreatedAt}</p>
        </FullGridSize>

        <Title id="tituloHito">
            {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile') }
            <br/>
        </Title>
        
        <FullGridSize id="hitos">
            <Accordion activeIndex="0" onTabOpen={(a, b) => updateMarker(a)}>
                        {renderedMilestones.sort((a, b) => (a.order >  b.order) ? 1 : -1).map(function(milestone, key){
                            return <AccordionTab key={key} header= {milestone.name}> 
                                      <p> {t('addMilestone.description') + ': '} {milestone.description}</p>
                                      <p> {t('addMilestone.distance') + ': '} {milestone.distance}</p> 
                                      <p> {t('addMilestone.altitude') + ': '} {milestone.slope}</p> 
                                      <p> {t('addMilestone.latitude') + ': '} {milestone.latitude}</p> 
                                      <p> {t('addMilestone.longitude') + ': '} {milestone.longitude}</p> 
                                    </AccordionTab>;
                        })}
            </Accordion>

        </FullGridSize>
      </div>
      <div>
        <RouteDetailsMap
          lat={mapLat}
          long={mapLng}
        />
       
      </div>
    </div>
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
        <RouteDetails />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default AddMilestoneComponent;
