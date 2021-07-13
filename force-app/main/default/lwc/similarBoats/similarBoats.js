import { api, LightningElement, wire } from 'lwc';
import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats';

export default class SimilarBoats extends LightningElement {
  // Private
  currentBoat;
  relatedBoats;
  boatId;
  error;

  @api
  get recordId() {
    return this.boatId; // returns the boatId
  }
  set recordId(value) {
    this.boatId = value; // sets the boatId value
    this.setAttribute("boatId", value); // sets the boatId attribute
  }

  @api
  similarBy;

  // Wire custom Apex call, using the import named getSimilarBoats
  // Populates the relatedBoats list
  @wire(getSimilarBoats, { boatId: '$boatId', similarBy: '$similarBy' })
  similarBoats({ error, data }) {
    if (data) {
      console.log('data ' + JSON.stringify(data));
      this.relatedBoats = data;
    } else {
      console.log('error: ' + error);
      this.error = error;
    }
  }
  get getTitle() {
    return "Similar boats by " + this.similarBy;
  }
  get noBoats() {
    return !(this.relatedBoats && this.relatedBoats.length > 0);
  }

  // Navigate to record page
  openBoatDetailPage(event) {}
}
