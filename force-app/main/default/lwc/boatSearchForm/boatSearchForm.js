import { LightningElement, wire, track } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    @track selectedBoatTypeId = '';
    // Private
    error = undefined;
    @track searchOptions;
    
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map(type => {
        return {
              label: type.Name,
              value: type.Id
            }
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
        console.log('this.search '+ JSON.stringify(this.searchOptions));
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
        console.log('inside error');
      }
    }
    
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        console.log('selectedBoatTypeId ' + this.selectedBoatTypeId);
        const searchEvent = new CustomEvent('search', {
            detail: {boatTypeId: this.selectedBoatTypeId}
        });
        this.dispatchEvent(searchEvent);
    }
  }
  