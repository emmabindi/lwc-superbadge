import { LightningElement, wire, api } from 'lwc';
import { MessageContext } from 'lightning/messageService';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';

const SUCCESS_TITLE = 'Success'; 
const MESSAGE_SHIP_IT = 'Ship it!'; 
const SUCCESS_VARIANT = 'success'; 
const ERROR_TITLE = 'Error'; 
const ERROR_VARIANT = 'error'; 
export default class BoatSearchResults extends LightningElement {
    selectedBoatId; columns = []; 
    boatTypeId = ''; 
    boats; 
    isLoading = false;

    @wire(MessageContext)
    messageContext;

    /*@wire(getBoats, {boatTypeId: this.boatTypeId})
    wiredBoats;
   
    wiredBoats({error, data }) {
        if (error) {
            console.log('error');
        } else if (data) {
            console.log('data ' + data);
            this.boats = data.boats;
        }
     }*/

    // public function that updates the existing boatTypeId property
    // uses notifyLoading
    searchBoats(boatTypeId) { 
        console.log('inside searchBoats');
        console.log('boatTypeId ' + boatTypeId);
        // had this in the parent but I need to search here?? 

        /*getBoats(event.detail).then(result => {
            // handle the result which is a list of boats 
            console.log('result ' + result);
            this.handleDoneLoading;
          }).catch(error => {
            console.log('inside error');
            this.handleDoneLoading;
          })*/
    }

  // this public function must refresh the boats asynchronously
  // uses notifyLoading
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