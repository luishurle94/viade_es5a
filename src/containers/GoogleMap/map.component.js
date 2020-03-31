import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import {Mapa} from './map.style'


export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  constructor(props) {
    super(props);
    // TODO
    this.route = this.ejemplo();
  }

  onReady = ({ google }, map) => {
    this.loadGeoJson(map);
  }

  loadGeoJson = async (map) => {
    const geoJson = await this.route.getGeoJson();
    console.log(geoJson)
    map.data.addGeoJson(geoJson);
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: 43.3545698,
            lng: -5.8511608
          }}
          zoom={14}
          onReady={this.onReady}
          styles={Mapa}
        >
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h1>{this.state.activeMarker.name}</h1>
              <p>{this.state.activeMarker.description}</p>
            </div>
          </InfoWindow>

        </Map>
      </div>
    );
  }


  // TODO SIMULATE
  async ejemplo() {
    let route = {};
    route.getGeoJson = function () {
      return {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  -5.850943922996521,
                  43.35589397969254
                ],
                [
                  -5.851303339004517,
                  43.35510997685353
                ],
                [
                  -5.850740075111388,
                  43.35470041910396
                ],
                [
                  -5.849431157112122,
                  43.354552197522914
                ],
                [
                  -5.848755240440369,
                  43.35480963477412
                ],
                [
                  -5.848492383956909,
                  43.355371312258654
                ],
                [
                  -5.850890278816223,
                  43.35590178066491
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Prueba1",
              "description": "Descripcion Prueba1"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                -5.850901007652283,
                43.35591738260667
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "marker-color": "#7e7e7e",
              "marker-size": "medium",
              "marker-symbol": ""
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                -5.848234891891479,
                43.35578476597392
              ]
            }
          }
        ]
      }
    }

    return route;
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtYMYV3UcZ26brAz0A2lGGY5Iiwk6-xs0')
})(MapContainer);