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
      // this is parent we need to call method searchBoats from child boatSearchReuslts
      // and pass it the typeId 
      const child = this.template.querySelector('c-boat-search-results');
      const boatTypeId = event.detail.boatTypeId;
      child.searchBoats(boatTypeId);
    }
    
    createNewBoat() { }
  }
  