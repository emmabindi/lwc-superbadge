import { LightningElement, track } from 'lwc';

 export default class BoatSearch extends LightningElement {
    isLoading = false;
    
    handleLoading() { 
      this.isLoading = true;
    }
    
    handleDoneLoading() {
      this.isLoading = false;
     }
    
    searchBoats(event) {
      console.log('inside searchBoats in boatSearch ');
      this.handleLoading;
      // this is parent we need to call method searchBoats from child boatSearchReuslts
      // and pass it the typeId 
      console.log('boatTypeId ' + event.detail.boatTypeId);
      const child = this.template.querySelector('c-boat-search-results');
      console.log('child ' + child);
      const boatTypeId = event.detail.boatTypeId;
      child.searchBoats(boatTypeId);
    }
    
    createNewBoat() { }
  }
  