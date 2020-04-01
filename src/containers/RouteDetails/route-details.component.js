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
import { Card } from 'primereact/card';
import { useTranslation } from 'react-i18next';

import { GalleriaComponent } from '@components';
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

let route;
let routeId = "";

if (window.location.href.split("?")[1]) {
  routeId = window.location.href.split("?")[1].split("=")[1];
}

let images;

export const RouteDetails = () => {

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
  useEffect(() => {
    if (!route) {
      obtainChildren();
    }
  });

  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(false);

  async function obtainChildren() {
    setLoading(true);
    try {
      route = await RouteService.get(routeId, false, false);
      if (route) {
        setRenderedName(route.name);
        setRenderedDescription(route.description);

        if (Number(route.distance))
          setRenderedDistance(route.distance);

        if (Number(route.slope))
          setRenderedSlope(route.slope);

        setRenderedRank(route.rank);
        setRenderedCreatedBy(route.createdBy);

        if (route.createdAt)
          setRenderedCreatedAt(new Date(route.createdAt).toLocaleDateString().toString());

        if (route.milestonesObject) {
          route.milestonesObject.sort((a, b) => a.order > b.order);
          setRenderedMilestones(route.milestonesObject);
          setLoading(false)
        }

        if (route.mediaObject) {
          images = route.mediaObject.filter(m => m).map(function (m) {
            console.log();
            return {
              previewImageSrc: m.href,
              thumbnailImageSrc: m.href,
              title: `${m.href.split('/media/').pop().substring(0, 27)}...`,
              alt: new Date(m.createdAt).toLocaleDateString()
            }
          });
        }
      }
    } catch (error) {
      errorToaster(t('addMilestone.notifications.errorLoadingMilestones'));
      console.log(error)
    }

  }

  function updateMarker(milestone) {
    let lat = renderedMilestones[milestone.index].latitude;
    let lng = renderedMilestones[milestone.index].longitude;
    if (lat && lng) {
      setMapLat(lat);
      setMapLng(lng);
    }
  }

  return (
    <div>

      <Form>
        <div style={flexStyle}>
          <Card style={{ minWidth: '450px', maxWidth: '450px' }}>
            <div style={{ overflowY: 'auto', height: '78vh', paddingRight: '16px' }}>
              <FullGridSize>
                <Title id="tituloRuta">
                  {t('routeDetails.title')}
                  <br />
                </Title>
                <p> <span>{t('addMilestone.name') + ': '}</span> {renderedName}</p>
                <p> <span>{t('addMilestone.description') + ': '}</span> {renderedDescription}</p>
                <p> <span>{t('addMilestone.distance') + ': '}</span> {renderedDistance}</p>
                <p> <span>{t('addMilestone.slope') + ': '}</span>{renderedSlope}</p>
                <p> <span>{t('addRoute.rank') + ': '}</span> {renderedRank}</p>
                <p> <span>{t('addRoute.creator') + ': '}</span> {renderedCreatedBy}</p>
                <p> <span>{t('addRoute.createdAt') + ': '}</span> {renderedCreatedAt}</p>
              </FullGridSize>

              <Title id="tituloHito">
                {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile')}
                <br />
              </Title>

              <FullGridSize id="hitos">
                <Accordion activeIndex="0" onTabOpen={(a, b) => updateMarker(a)}>
                  {renderedMilestones.sort((a, b) => a.order > b.order).map(function (milestone, key) {
                    return <AccordionTab key={key} header={milestone.name}>
                      <p> {t('addMilestone.description') + ': '} {milestone.description}</p>
                      <p> {t('addMilestone.distance') + ': '} {milestone.distance}</p>
                      <p> {t('addMilestone.altitude') + ': '} {milestone.slope}</p>
                      <p> {t('addMilestone.latitude') + ': '} {milestone.latitude}</p>
                      <p> {t('addMilestone.longitude') + ': '} {milestone.longitude}</p>
                    </AccordionTab>;
                  })}
                </Accordion>

              </FullGridSize>

              {images &&
                <div>
                  <Title id="tituloGaleria">
                    {t('routeDetails.media')}
                    <br />
                  </Title>

                  <FullGridSize id="galeria">
                    <GalleriaComponent images={images} activeIndex={0} isAutoPlayActive={false} isPreviewFullScreen={false} />
                  </FullGridSize>
                </div>
              }
            </div>
          </Card>
          <div>
            <RouteDetailsMap
              lat={mapLat}
              long={mapLng}
              route={route}
            />
          </div>
        }
      </div>
        {isLoading && <Loader absolute />}
      </Form>
    </div>
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
