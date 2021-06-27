import { LightningElement, wire, api, track } from 'lwc';
import { MessageContext } from 'lightning/messageService';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
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

    @wire(MessageContext)
    messageContext;

   @wire(getBoats, { boatTypeId: '$boatTypeId'})
    wiredBoats({error, data}) {
        if (error) {
            this.error = error;
            console.log('error');
        } else if (data) {
            console.log('data ' + data);
            this.boats = data;
            data.forEach(boat =>{
                console.log('boat: ' + boat.Name);
            })
        }
    }

    @api
    searchBoats(boatTypeId) { 
        // this.notifyLoading;
        console.log('inside searchBoats in Results');
        console.log('54 boatTypeId ' + boatTypeId);
        this.boatTypeId = boatTypeId;
        // here call wiredBoats or getBoats with a param?
        this.wiredBoats(this.boatTypeId);
    }

  // this public function must refresh the boats asynchronously uses notifyLoading
    refresh() { }
    
    // this function must update selectedBoatId and call sendMessageService
    updateSelectedTile() { }
    
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
    // Check the current value of isLoading before dispatching the doneloading or loading custom event
    notifyLoading(isLoading) { }


    /*
    The component boatSearchResults gets the data returned by 
    getBoats(), which stores the search results in a component
     attribute boats through a wired function called wiredBoats(). 
     Next, boatSearchResults loops through the results and displays 
     each one as a boatTile, arranged in a responsive grid. 
     Use a scoped <lightning-tabset> that’s only rendered if 
     the attribute boats contains data to be displayed.
    */
}