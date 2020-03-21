/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { errorToaster } from '@utils';
import { Loader } from '@util-components';
import { RouteService } from '@services';
import {Accordion,AccordionTab} from 'primereact/accordion';

import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Form,
  FullGridSize,
  Title
} from './route-details.style';

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

  return ( 
    <Form>  
      <Title>
          {t('routeDetails.title')}
          <br/>
      </Title>

      <FullGridSize> 
          <p> {t('addMilestone.name') + ': '} {renderedName}</p>
          <p> {t('addMilestone.description') + ': '} {renderedDescription}</p>
          <p> {t('addMilestone.distance') + ': '} {renderedDistance}</p>
          <p> {t('addMilestone.slope') + ': '}{renderedSlope}</p>
          <p> {t('addRoute.rank') + ': '} {renderedRank}</p>
          <p> {t('addRoute.creator') + ': '} {renderedCreatedBy}</p>
          <p> {t('addRoute.createdAt') + ': '} {renderedCreatedAt}</p>
      </FullGridSize>

      <Title>
          {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile') }
          <br/>
      </Title>
      
      <FullGridSize>
          <Accordion activeIndex="0">
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
