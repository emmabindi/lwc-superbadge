import { LightningElement, track } from 'lwc';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';

 export default class BoatSearch extends LightningElement {
    isLoading = false;
    
    handleLoading() { }
    
    handleDoneLoading() { }
    
    searchBoats(event) {
      console.log('inside searchBoats ');

      this.isLoading = true;
      getBoats(event.detail).then(result => {
        this.isLoading = false;
        this.handleDoneLoading;
        // handle the result which is a list of boats 
        console.log('result ' + result);
      }).catch(error => {
        console.log('inside error');
        this.isLoading = false;
      })

    }
    
    createNewBoat() { }
  }
  