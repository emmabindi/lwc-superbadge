import { api, LightningElement, wire } from 'lwc'; 

const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {
  boatTypeId;
  mapMarkers = [];
  isLoading = true;
  isRendered = false;
  latitude;
  longitude;
  
  // Add the wired method from the Apex Class
  // Name it getBoatsByLocation, and use latitude, longitude and boatTypeId
  // Handle the result and calls createMapMarkers
  wiredBoatsJSON({error, data}) { }
  
  // Controls the isRendered property
  renderedCallback() { 
      console.log('inside rendered' + this.isRendered);
      if (!this.isRendered) {
          this.getLocationFromBrowser();
      }
      this.isRendered = true;
  }
  
  getLocationFromBrowser() {
      console.log('inside getLocationFromBrowser');
      console.log(navigator.geolocation.getCurrentPosition((position) => {
          console.log('99: ' + position);
      }
      ));
      navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
      });
   }
   
  // Creates the map markers
  createMapMarkers(boatData) {
     // const newMarkers = boatData.map(boat => {...});
     // newMarkers.unshift({...});
   }
}
