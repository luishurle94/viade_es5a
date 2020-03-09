import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {
  MapContainer
} from './milestone-map.style';

const mapStyles = {
  width: '210%',
  height: '100%',
};

const sideBarStyle = {
  'height': '100%',
  'backgroundColor': 'lightblue',
  'width': '100%',
  'position': 'relative',
}

export class MilestoneMap extends Component  {

  _isMounted = false;

  constructor(props){
    super(props);
    this.state={
      lat:null,
      lng:null,
      isLoading: true
    }
  }

  componentDidMount(){
    this._isMounted = true;

    if(this._isMounted){
      navigator.geolocation.getCurrentPosition(position=>
        this.setState({
          lat:position.coords.latitude,
          lng:position.coords.longitude,
        }));
    }

   }

   componentWillUnmount() {
    this._isMounted = false;
  }

   mapClicked = (mapProps, map, event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.props.setLatLng(lat, lng);
  }

  render() {
    if (!this.props.loaded | !this._isMounted) {
      return <div>Loading...</div>
    }

    return (


      <div style={sideBarStyle}>
        <MapContainer>
          <Map
            google={this.props.google}
            zoom={11}
            style={mapStyles}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            center={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            onClick={this.mapClicked}
            latitud = {this.getLatitude}>
            <Marker
              title={'Geolocation'}
              position={{
              lat:this.state.lat,
              lng:this.state.lng,
            }}
            fullscreenControl= {false}
       />
          </Map>
        </MapContainer>
      </div>
     
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtYMYV3UcZ26brAz0A2lGGY5Iiwk6-xs0')
})(MilestoneMap)

