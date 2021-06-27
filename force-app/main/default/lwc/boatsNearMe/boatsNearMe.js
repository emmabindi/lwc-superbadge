import { api, LightningElement, wire, track } from 'lwc';
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {
  @api boatTypeId = '';
  @track mapMarkers = [];
  isLoading = true;
  @track isRendered = false;
  latitude;
  longitude;
  
  @wire(getBoatsByLocation, { latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
  wiredBoatsJSON({error, data}) { 
      if (data) {
          this.createMapMarkers(data);
      } else if (error) {
        this.dispatchEvent(new ShowToastEvent({
            title: ERROR_TITLE,
            variant: ERROR_VARIANT
        }));
        this.isLoading = false;
      } 
  }
  
  renderedCallback() { 
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
   
  createMapMarkers(boatData) {
     const boatJSON = JSON.parse(boatData);
      
     const newMarkers = boatJSON.map(boat => (
        {
            location: {
                Latitude: boat.Geolocation__Latitude__s,
                Longitude: boat.Geolocation__Longitude__s
            },
            title: boat.Name
        }
     ));
    
    newMarkers.unshift({
        location: {
            Latitude: this.latitude,
            Longitude: this.longitude
        },
        title: LABEL_YOU_ARE_HERE,
        icon: ICON_STANDARD_USER
    });
    this.isLoading = false;
    this.mapMarkers = newMarkers;
    }
}
