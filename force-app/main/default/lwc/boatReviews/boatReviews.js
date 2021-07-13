import { LightningElement, api, track } from 'lwc';
import getAllReviews from '@salesforce/apex/BoatDataService.getAllReviews';
import { NavigationMixin } from "lightning/navigation";

export default class BoatReviews extends NavigationMixin(LightningElement) {
  boatId;
  @track error;
  @track boatReviews;
  isLoading;

  // Getter and Setter to allow for logic to run on recordId change
  @api
  get recordId() {
    return this.boatId;
  }
  set recordId(value) {
    this.setAttribute("boatId", value); //sets boatId attribute
    this.boatId = value; //sets boatId assignment
    this.getReviews(); //get reviews associated with boatId
  }

  // Getter to determine if there are reviews to display
  /* Develop a getter named reviewsToShow() that returns true if boatReviews is not null, 
    not undefined, and if it has at least one record. Otherwise, it returns false. */
  get reviewsToShow() {
    if (this.boatReviews != null) {
      return true;
    } else {
      return false;
    }
  }

  // Public method to force a refresh of the reviews invoking getReviews
  @api
  refresh() {
    // this.template.querySelector('c-boat-reviews').refresh();
    this.getReviews();
  }

  // Imperative Apex call to get reviews for given boat
  // returns immediately if boatId is empty or null
  // sets isLoading to true during the process and false when it’s completed
  // Gets all the boatReviews from the result, checking for errors.
  getReviews() {
    if (!this.boatId) return;
    this.isLoading = true;

    getAllReviews({ boatId: this.boatId })
      .then((result) => {
        this.boatReviews = result;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log("error: " + error.body);
        if (Array.isArray(error.body)) {
          this.error = error.body.map((e) => e.message).join(", ");
        } else if (typeof error.body.message === "string") {
          this.error = error.body.message;
        }
        this.isLoading = false;
      });
  }

  // Helper method to use NavigationMixin to navigate to a given record on click
  navigateToRecord(event) {
      console.log('e: ' + event.target);
      event.preventDefault();
      event.stopPropagation();
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          objectApiName: "User",
          recordId: event.target.dataset.recordId,
          actionName: "view"
        }
      });
  }
}
  