import { LightningElement, track } from 'lwc';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';

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
      
      getBoats(event.detail).then(result => {
        // handle the result which is a list of boats 
        console.log('result ' + result);
        console.log(JSON.stringify(result));
        this.handleDoneLoading;
      }).catch(error => {
        console.log('inside error');
        this.handleDoneLoading;
      })

    }
    
    createNewBoat() { }
  }
  