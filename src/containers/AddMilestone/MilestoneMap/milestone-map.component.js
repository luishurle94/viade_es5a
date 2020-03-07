import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {
  MapContainer
} from './milestone-map.style';

const mapStyles = {
  width: '55%',
  height: '20%',
};

export class MilestoneMap extends Component  {

  constructor(props){
    super(props);
    this.state={
      lat:null,
      lng:null
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=>
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
      }));
   }

   mapClicked = (mapProps, map, event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.props.setLatLng(lat, lng);
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
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
       />


      </Map>
      </MapContainer>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtYMYV3UcZ26brAz0A2lGGY5Iiwk6-xs0')
})(MilestoneMap)

