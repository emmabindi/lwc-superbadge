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

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true},
    { label: 'Length', fieldName: 'Length__c', editable: true},
    { label: 'Price', fieldName: 'Price__c', editable: true},
    { label: 'Description', fieldName: 'Description__c', editable: true},
];
export default class BoatSearchResults extends LightningElement {
    selectedBoatId; 
    boatTypeId = ''; 
    @track boats; 
    isLoading = false;
    error;
    columns = columns; 

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
    
    updateSelectedTile(event) { 
        this.selectedBoatId = event.detail.boatId;
        this.sendMessageService(this.selectedBoatId);
    }
    
    sendMessageService(boatId) { 
        publish(this.messageContext, BOAT_SELECTED_MESSAGE, 
            { recordId: boatId })
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
            this.dispatchEvent(new CustomEvent('loading'));
        } else {
            this.dispatchEvent(new CustomEvent('doneloading'));
        }
    }
}