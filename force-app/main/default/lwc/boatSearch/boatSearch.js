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
      console.log('inside searchBoats ');
      this.handleLoading;
      // this is parent we need to call method searchBoats from child boatSearchReuslts
      // and pass it the typeId 
      const child = this.template.querySelector('c-boat-search-results');
      console.log('child ' + child);
      const boatTypeId = event.detail.boatTypeId;
      child.searchBoats(boatTypeId);
      /* 
     Customize this function to pass the value of boatTypeId to the
      public function searchBoats(boatTypeId) from the boatSearchResults component, 
      so it can be used by getBoats().
    */

    }
    
    createNewBoat() { }
  }
  