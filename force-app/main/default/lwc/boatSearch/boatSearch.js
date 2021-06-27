import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

 export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    
    handleLoading() { 
      this.isLoading = true;
    }
    
    handleDoneLoading() {
      this.isLoading = false;
     }
    
    searchBoats(event) {
      // this is parent we need to call method searchBoats from child boatSearchReuslts
      // and pass it the typeId 
      const child = this.template.querySelector('c-boat-search-results');
      const boatTypeId = event.detail.boatTypeId;
      child.searchBoats(boatTypeId);
    }
    
    createNewBoat() {
      this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
          objectApiName: 'Boat__c',
          actionName: 'new'
        }
      })
     }
  }
  