import { LightningElement, wire, api, track } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import BOAT_SELECTED_MESSAGE from '@salesforce/messageChannel/BoatMessageChannel__c';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';

const SUCCESS_TITLE = 'Success'; 
const MESSAGE_SHIP_IT = 'Ship it!'; 
const SUCCESS_VARIANT = 'success'; 
const ERROR_TITLE = 'Error'; 
const ERROR_VARIANT = 'error'; 
export default class BoatSearchResults extends LightningElement {
    selectedBoatId; 
    columns = []; 
    boatTypeId = ''; 
    @track boats; 
    isLoading = false;
    error;

    @wire(MessageContext) messageContext;

   @wire(getBoats, { boatTypeId: '$boatTypeId'})
    wiredBoats({error, data}) {
        if (error) {
            this.error = error;
            console.log('error');
            this.isLoading = false;
            this.notifyLoading();
        } else if (data) {
            this.boats = data;
            this.isLoading = false;
            this.notifyLoading();
        }
    }

    @api
    searchBoats(boatTypeId) { 
        this.isLoading = true;
        this.notifyLoading();
        this.boatTypeId = boatTypeId;
        this.wiredBoats(this.boatTypeId);
    }

  // this public function must refresh the boats asynchronously uses notifyLoading
    refresh() { }
    
    // this function must update selectedBoatId and call sendMessageService
    updateSelectedTile(event) { 
        console.log('inside updateSelectedTile in results');
        console.log('e: ' + event.detail.boatId);
        this.selectedBoatId = event.detail.boatId;
        publish(this.messageContext, BOAT_SELECTED_MESSAGE, 
            { recordId: this.selectedBoatId })
    }
    
    // Publishes the selected boat Id on the BoatMC.
    sendMessageService(boatId) { 
        // explicitly pass boatId to the parameter recordId
    }
    
    // The handleSave method must save the changes in the Boat Editor
    // passing the updated fields from draftValues to the 
    // Apex method updateBoatList(Object data).
    // Show a toast message with the title
    // clear lightning-datatable draft values
    handleSave(event) {
        // notify loading
        const updatedFields = event.detail.draftValues;
        // Update the records via Apex
        updateBoatList({data: updatedFields})
        .then(() => {})
        .catch(error => {})
        .finally(() => {});
    }

    notifyLoading(isLoading) { 
        if (this.isLoading === true) {
            console.log('isLoading is true');
            this.dispatchEvent(new CustomEvent('loading'));
        } else {
            console.log('isLoading is false');
            this.dispatchEvent(new CustomEvent('doneloading'));
        }
        // this is where to dispatch events loading and doneloading for search parent to handle the spinner
    }
}