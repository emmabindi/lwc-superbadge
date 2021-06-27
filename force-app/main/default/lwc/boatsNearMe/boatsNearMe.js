import { api, LightningElement, wire, track } from 'lwc';
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';

const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {
  @api boatTypeId = '';
  mapMarkers = [];
  isLoading = true;
  @track isRendered = false;
  latitude;
  longitude;
  
  // Handle the result and calls createMapMarkers
  @wire(getBoatsByLocation, { latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
  wiredBoatsJSON({error, data}) { 
      if (data) {
          console.log('data: ' + data);
          // this.createMapMarkers(pass in the lat//);
      } else if (error) {
          console.log('error: ' + error);
      } 
      this.isLoading = false;
  }
  
  renderedCallback() { 
      console.log('inside rendered' + this.isRendered);
      console.log(this.isRendered);
      console.log('boat ' + this.boatTypeId);
      if (!this.isRendered) {
          this.getLocationFromBrowser();
      } 
      this.isRendered = true;
  }
  
  getLocationFromBrowser() {
      navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('lat: ' + this.latitude);
          console.log('long: ' + this.longitude);
      });
   }
   
  // Creates the map markers
  createMapMarkers(boatData) {
     // const newMarkers = boatData.map(boat => {...});
     // newMarkers.unshift({...});
   }
}
