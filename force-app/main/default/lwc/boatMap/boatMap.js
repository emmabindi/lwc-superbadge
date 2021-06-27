import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { api, wire, LightningElement } from "lwc";
import { subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe } from 'lightning/messageService';
import { getRecord } from 'lightning/uiRecordApi';

const LONGITUDE_FIELD = '@salesforce/schema/Boat__c.Geolocation__Longitude__s';
const LATITUDE_FIELD = '@salesforce/schema/Boat__c.Geolocation__Latitude__s';
const BOAT_FIELDS = [LONGITUDE_FIELD, LATITUDE_FIELD];
export default class BoatMap extends LightningElement {
  
  // private
  subscription = null;
  @api boatId;

  // Getter and Setter to allow for logic to run on recordId change
  @api
  get recordId() {
    return this.boatId;
  }
  set recordId(value) {
    this.setAttribute('boatId', value);
    this.boatId = value;
  }

  error = undefined;
  mapMarkers = [];

  @wire(MessageContext) messageContext;

  @wire(getRecord, { recordId: '$boatId', BOAT_FIELDS })
  wiredRecord({ error, data }) {
    if (data) {
      console.log('data: ' + data);
      this.error = undefined;
      const longitude = data.fields.Geolocation__Longitude__s.value;
      const latitude = data.fields.Geolocation__Latitude__s.value;
      this.updateMap(longitude, latitude);
    } else if (error) {
      this.error = error;
      this.boatId = undefined;
      this.mapMarkers = [];
    }
  }

  // Subscribes to the message channel
  subscribeMC() {
    console.log('inside subscribeMC');
    // recordId is populated on Record Pages, and this component
    // should not update when this component is on a record page.
    if (this.subscription || this.recordId) {
      return;
    }
    // Subscribe to the message channel to retrieve the recordId and explicitly assign it to boatId.
    console.log('after the if');
    this.subscription = subscribe(this.messageContext, BOATMC, (message) => this.handleMessageReceived(message), { scope: APPLICATION_SCOPE });
  }

  handleMessageReceived(msg) {
    this.boatId = msg.recordId;
  }

  connectedCallback() {
    this.subscribeMC();
  }

  // Creates the map markers array with the current boat's location for the map.
  updateMap(Longitude, Latitude) {
    console.log('inside updateMap');
  }

  // Getter method for displaying the map component, or a helper method.
  get showMap() {
    return this.mapMarkers.length > 0;
  }
}