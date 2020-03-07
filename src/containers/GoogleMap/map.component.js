import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker, Polygon} from 'google-maps-react';
import {Route} from '../../model/index';

export class MapContainer extends Component {

  async renderizarCoord(){
      let clon = this.ejemplo();
      //let clonRutas = await Route.ejemplo();
      let region = JSON.parse(JSON.stringify(clon));
      let coordenadas = region.geometry.coordinates[0][0];// region['geometry.coordinates'][0][0]
      let coordArr = []
      coordenadas.map(coordenada =>
      coordArr.push( {lat:coordenada[1], lng: coordenada[0]} ))
      return coordArr;
    
  }

  render() {
    return (
      <div>
        <Map 
          google={this.props.google}
          zoom={15}
          initialCenter={{lat:43.3545698,lng:-5.8511608}}
        
        >
      
 
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Oviedo</h1>
            </div>
          </InfoWindow>

          <Marker
            lat={3.3545698}
            lng={-5.8511608}
            name="Uniovi"
            color="blue"
          />
         
         <Polygon
                  path={this.renderizarCoord()}
                  options={{
                    strokeColor:'#fc1e0d',
                    strokeOpacity: 1,
                    strokeWeight: 1
                  }} 
                  />
          

        </Map>
      </div>
    );
  }

  ejemplo(){
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
          "properties": {},
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


}



export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtYMYV3UcZ26brAz0A2lGGY5Iiwk6-xs0')
})(MapContainer)