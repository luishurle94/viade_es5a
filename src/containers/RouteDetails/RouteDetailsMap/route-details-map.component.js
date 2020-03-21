import React, { Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { RouteDetailsMapContainer } from './route-details-map.style';

const mapStyles = {
    width: '375%',
    height: '250%',
  };
  
  const sideBarStyle = {
    'marginLeft': '300px',
    'height': '100%',
    'backgroundColor': 'lightblue',
    'width': '100%',
    'position': 'relative',
  };

export class RouteDetailsMap extends Component  {

    _isMounted = false;
    markers = [];

   
  
    constructor(props){
      super(props);

      this.state={
        lat:this.props.lat,
        lng:this.props.long,
        isLoading: true
      }
    }
  
    componentDidMount(){
      this._isMounted = true;
     }
  
     componentWillUnmount() {
      this._isMounted = false;
    }

  

    fetchData = (lat, lng) => {
      setTimeout(() => {
        this.setState({
          lat : this.props.lat,
          lng : this.props.long
        });
      }, 5000);
    };
  
    componentDidUpdate(prevProps) {
      if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.long) {
        this.fetchData(this.props.lat, this.props.long);
      }
    }
    

    render() {
      if (!this.props.loaded | !this._isMounted) {
        return <div>Loading...</div>
      }
  
      return (
  
  
        <div style={sideBarStyle}>
          <RouteDetailsMapContainer>
            <Map
              google={this.props.google}
              zoom={12}
              style={mapStyles}
              
              center={{
                lat: this.state.lat,
                lng: this.state.lng
              }}
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
          </RouteDetailsMapContainer>
        </div>
       
       
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyDtYMYV3UcZ26brAz0A2lGGY5Iiwk6-xs0')
  })(RouteDetailsMap)
  
  