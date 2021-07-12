import { LightningElement, api, track } from 'lwc';
import getAllReviews from '@salesforce/apex/BoatDataService.getAllReviews';

export default class BoatReviews extends LightningElement {
    boatId;
    @track error;
    @track boatReviews;
    isLoading;
    
    // Getter and Setter to allow for logic to run on recordId change
    @api
    get recordId() { 
        console.log('inside get ' + this.boatId);
        return this.boatId;
    }
    set recordId(value) {
      console.log('inside set, val: ' + value);
      this.setAttribute('boatId', value); //sets boatId attribute
      this.boatId = value; //sets boatId assignment
      //get reviews associated with boatId
      this.getReviews(this.boatId);
    }
    
    // Getter to determine if there are reviews to display
    get reviewsToShow() {
        return this.boatReviews ? true : false;
     }
    
    // Public method to force a refresh of the reviews invoking getReviews
    refresh() { }
    
    // Imperative Apex call to get reviews for given boat
    // returns immediately if boatId is empty or null
    // sets isLoading to true during the process and false when it’s completed
    // Gets all the boatReviews from the result, checking for errors.
    getReviews() {
        console.log('get reviews');
        
        if (!this.boatId) return;
        console.log('before get ' + this.boatId);
        this.isLoading = true;

        getAllReviews({boatId: this.boatId}).then(result => {
            console.log('result: ' + JSON.stringify(result));
            this.boatReviews = result;
            this.isLoading = false;
        }).catch(error => {
            console.log('error: ' + error.body);
            if (Array.isArray(error.body)) {    
                this.error = error.body.map(e => e.message).join(', ');         
            } else if (typeof error.body.message === 'string') {
                this.error = error.body.message;        
            }
            this.isLoading = false;
        });
     }
    
    // Helper method to use NavigationMixin to navigate to a given record on click
    navigateToRecord(event) {  }
  }
  