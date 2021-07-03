import { LightningElement, wire, api, track } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatList';
import BoatMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

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
    boats; 
    isLoading = false;
    error;
    columns = columns; 
    draftValues = [];

   @wire(MessageContext) messageContext;

   @wire(getBoats, { boatTypeId: '$boatTypeId'})
    wiredBoats(result) {
        if (result.data) {
            this.boats = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = error;
            this.boats = undefined;
            console.log('error');
        }
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    @api
    searchBoats(boatTypeId) { 
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.boatTypeId = boatTypeId;
        this.wiredBoats(this.boatTypeId);
    }
 
  // this public function must refresh the boats asynchronously uses notifyLoading
    @api
    async refresh() {
        console.log('inside refresh');
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        console.log('before await');

        await refreshApex(this.boats);
        
        console.log('after refreshApex ');

        this.isLoading = false;
        this.notifyLoading(this.isLoading);
     }
    
    updateSelectedTile(event) { 
        this.selectedBoatId = event.detail.boatId;
        this.sendMessageService(this.selectedBoatId);
    }
    
    sendMessageService(boatId) { 
        publish(this.messageContext, BoatMC, 
            { recordId: boatId })
    }
    
    // clear lightning-datatable draft values
    handleSave(event) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        
        const updatedFields = event.detail.draftValues;
        const notifyChangeIds = updatedFields.map(row => {
            return {
                "recordId": row.Id
            };
        });

        updateBoatList({data: updatedFields})
        .then((result) => {
            console.log('result: ' + result);
            this.dispatchEvent(new ShowToastEvent({
                title: SUCCESS_TITLE,
                message: MESSAGE_SHIP_IT,
                variant: SUCCESS_VARIANT
            }));

            getRecordNotifyChange(notifyChangeIds);
            console.log('this.notifyChangeIds[0] ' + notifyChangeIds[0].recordId);
            this.refresh();
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: ERROR_TITLE,
                variant: ERROR_VARIANT
            }))
            
        })
        .finally(() => {
            console.log('Finally');
            this.isLoading = false;
            this.notifyLoading(this.isLoading);
            this.draftValues = [];
        });
    }

    notifyLoading(isLoading) { 
        if (this.isLoading === true) {
            this.dispatchEvent(new CustomEvent('loading'));
        } else {
            this.dispatchEvent(new CustomEvent('doneloading'));
        }
    }
}