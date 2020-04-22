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
  Button
} from './route-details.style';
import RouteDetailsMap from './RouteDetailsMap';
import { Chat } from '@containers';

const flexStyle = {
  'display': 'flex',
  'flexDirection': 'row',
  'height': '100%',
  'width': '100%',
  'position': 'relative',
};

type Props = { history: any };

export const RouteDetails = ({ history, webId }: Props) => {

  let routeId = "";

  if (window.location.href.split("?")[1]) {
    const aux = window.location.href.split("?")[1].split("=")[1];
    if (aux !== routeId) {
      routeId = aux;
    }
  }

  const [route, setRoute] = useState(null);
  const [images, setImages] = useState(null);
  const [files, setOtherFiles] = useState(null);
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
    obtainChildren();
  }, []);

  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(false);

  async function obtainChildren() {
    setLoading(true);
    try {
      const fetch = await RouteService.get(routeId, false, false, false);
      if (fetch) {
        setRenderedName(fetch.name);
        setRenderedDescription(fetch.description);

        if (Number(fetch.distance))
          setRenderedDistance(fetch.distance);

        if (Number(fetch.slope))
          setRenderedSlope(fetch.slope);

        setRenderedRank(fetch.rank);
        setRenderedCreatedBy(fetch.createdBy);

        if (fetch.createdAt)
          setRenderedCreatedAt(new Date(fetch.createdAt).toLocaleDateString().toString());

        if (fetch.milestonesObject) {
          fetch.milestonesObject = fetch.milestonesObject.filter(m => m).sort((a, b) => a.order - b.order);
          if (fetch.milestonesObject.length) {
            setRenderedMilestones(fetch.milestonesObject);
          }
        }
        if (fetch.mediaObject && fetch.mediaObject.length) {
          const fetchData = fetch.mediaObject.filter(m => m && m.href);
          let fetchImages = fetchData.filter(m => isValidImageURL(m.href));
          const otherFiles = fetchData.filter((f) => !fetchImages.includes(f));

          fetchImages = fetchImages.map(function (m) {
            return {
              previewImageSrc: m.href,
              thumbnailImageSrc: m.href,
              title: formatUrl(m.href),
              alt: new Date(m.createdAt).toLocaleDateString()
            }
          });

          setOtherFiles(otherFiles);
          setImages(fetchImages);
        }
        setLoading(false);
        setRoute(fetch)
        return fetch;
      }
    } catch (error) {
      console.error(error)
      errorToaster(t('addMilestone.notifications.errorLoadingMilestones'));
      setLoading(false)
    }
    return undefined;
  }

  function isValidImageURL(str){
    if ( typeof str !== 'string' ) return false;
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|svg)$/gi);
  }

  function formatUrl(str, split='/media/') {
    str = str.split(split).pop();
    return str.length > 27 ? `${str.substring(0, 27)}...` : str;
  }

  function updateMarker(milestone) {
    let lat = renderedMilestones[milestone.index].latitude;
    let lng = renderedMilestones[milestone.index].longitude;
    if (lat && lng) {
      setMapLat(lat);
      setMapLng(lng);
    }
  }

  function addMilestones(){
    history.push(`/route-edit?routeId=${routeId}`);
  }



  return (
    <div>

      <Form>
        <div style={flexStyle} className="p-grid">
          <Card className="p-col-12 p-md-6 p-lg-3" style={{ minWidth: '450px', maxWidth: '450px' }}>
            <div style={{ overflowY: 'auto', height: '78vh', paddingRight: '16px' }}>
              <FullGridSize>
                <Title id="tituloRuta">
                  {t('routeDetails.title')}
                  <br />
                </Title>
                <p> <span>{t('addMilestone.name') + ': '}</span> {renderedName}</p>
                <p> <span>{t('addMilestone.description') + ': '}</span> {renderedDescription}</p>
                { renderedDistance !== 0 && <p> <span>{t('addMilestone.distance') + ': '}</span> {renderedDistance}</p> }
                { renderedSlope !== 0 && <p> <span>{t('addMilestone.slope') + ': '}</span>{renderedSlope}</p> }
                { renderedRank !== 0 && <p> <span>{t('addRoute.rank') + ': '}</span> {renderedRank}</p> }
                <p> <span>{t('addRoute.creator') + ': '}</span><a href={renderedCreatedBy}>{renderedCreatedBy}</a></p>
                <p> <span>{t('addRoute.createdAt') + ': '}</span> {renderedCreatedAt}</p>

                <br/>
                <div> <Button data-testid="details" className="button, block" label="Details" onClick={() => addMilestones()}>{t('editRoute.title')}</Button> </div>
              </FullGridSize>

              <Title id="tituloHito">
                {t('addMilestone.accordionTitle') + ' ' + renderedMilestones.length + ' ' + t('addMilestone.accordionEndTtile')}
                <br />
              </Title>

              <FullGridSize id="hitos">
                <Accordion activeIndex="0" onTabOpen={(a, b) => updateMarker(a)}>
                  {renderedMilestones.filter(m => m).sort((a, b) => a.order - b.order).map(function (milestone, key) {
                    return <AccordionTab key={key} header={milestone.name || milestone.order}>
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
                { ((images && images.length > 0) || (files && files.length > 0)) &&
                  <Title id="tituloGaleria">
                      {t('routeDetails.media')}
                      <br />
                    </Title>
                }
              </FullGridSize>
              <FullGridSize>
                { images && images.length > 0 &&
                  <div>
                    <h5>
                      {t('routeDetails.images')}
                    </h5>
                    <FullGridSize id="galeria">
                      <GalleriaComponent images={images} activeIndex={0} isAutoPlayActive={false} isPreviewFullScreen={false} />
                    </FullGridSize>
                  </div>
                }
              </FullGridSize>
              <FullGridSize>
                { files && files.length > 0 &&
                  <div>
                    <h5>
                      {t('routeDetails.other')}
                    </h5>
                    <FullGridSize id="otherFiles">
                      <Accordion activeIndex="0">
                        {files.sort((a, b) => a.createdAt - b.createdAt).map(function (file, key) {
                          return <AccordionTab key={key} header={formatUrl(file.href)}>
                            { file.webId && <p><span>{t('media.webId') + ': '}</span> <a href={file.webId}>{ formatUrl(file.webId, '/viade/') }</a></p> }
                            { file.href && <p><span>{t('media.href') + ': '}</span> <a href={file.href}> { formatUrl(file.href) }</a></p> }
                            { file.createdAt && <p> <span>{t('media.createdAt') + ': '}</span> { new Date(file.createdAt).toLocaleDateString().toString() }</p> }
                          </AccordionTab>;
                        })}
                      </Accordion>
                    </FullGridSize>
                  </div>
                }
              </FullGridSize>
            </div>
          </Card>
          <div>
            <RouteDetailsMap className="p-col-12 p-md-6 p-lg-3"
              lat={mapLat}
              long={mapLng}
              route={route}
            />
          </div>
        }
      </div>
        {isLoading && <Loader absolute />}
      </Form>
      { route && <div>
        <Chat route={route} t={t} webId={webId} id={route.webId}></Chat>
      </div> }
    </div>
  );
};



/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const AddMilestoneComponent = ({ history, webId }: Props) => {
  const { t } = useTranslation();
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('addMilestone.title')}</p>
        </Header>
        <RouteDetails history={history} webId={webId}/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default AddMilestoneComponent;
