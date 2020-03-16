import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import axios from 'axios';

var locations = [];

var CustomSkinMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: -5.8376053, lng: -35.1991649 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: mapStyles
      }}
    >
      {/*<Marker position={{ lat: -5.8376053, lng: -35.1991649 }} />*/}
      {locations.map((sensor, index) => {return <Marker key={index} id={index} position={{lat: sensor.lat, lng: sensor.lng}} 
      onClick={() => window.alert(sensor.end)}/>})}
    </GoogleMap>
  ))
);

//

const mapStyles = [
  {
    featureType: "water",
    stylers: [
      { saturation: 43 },
      { lightness: -11 },
      { hue: "#0088ff" }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      { hue: "#ff0000" },
      { saturation: -100 },
      { lightness: 99 }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#808080" }, { lightness: 54 }]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [{ color: "#ece2d9" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#ccdca1" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#767676" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }]
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
  },
  { featureType: "poi.park", stylers: [{ visibility: "on" }] },
  {
    featureType: "poi.sports_complex",
    stylers: [{ visibility: "on" }]
  },
  { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "simplified" }]
  }
];

const headers={"fiware-service": "openiot", "fiware-servicepath": "/"};

export async function getLocations() {
  try {
    const response = await axios({
      "method": "get",
      "url": "http://10.7.229.35:1026/v2/entities",
      "headers": headers
    });
    console.log(response);
    
    response.data.forEach(item => {
      if('location' in item) {
        console.log("ID: "+item.id);
        locations.push({lat: item.location.value.coordinates[1], lng: item.location.value.coordinates[0], end: item.endereco.value.rua});
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}

export default function Maps() {
  getLocations();
  return (
    <CustomSkinMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD__CfNFBUebeKDE6vx7XJB0yu5TNai8Cw"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

/*import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        stores: [{lat: -5.837727, lng: -35.2046937},
                {latitude: -5.842306, longitude: -35.2017217},
                {latitude: -5.842434, longitude: -35.1992867},
                {latitude: -5.843459, longitude: -35.2012067},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}]
      }
    }
  
    displayMarkers = () => {
      return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.latitude,
         lng: store.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }
  
    render() {
      return (
          <Map
            google={this.props.google}
            zoom={16}
            style={mapStyles}
            initialCenter={{ lat: -5.8381414, lng: -35.2052825}}
          >
            {this.displayMarkers()}
          </Map>
      );
    }
  }
  

const mapStyles = {
    width: '100%',
    height: '100%',
  };

 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD__CfNFBUebeKDE6vx7XJB0yu5TNai8Cw'
})(MapContainer)*/