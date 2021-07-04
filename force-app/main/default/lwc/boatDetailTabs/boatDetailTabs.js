import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review'; 
import labelFullDetails from '@salesforce/label/c.Full_Details'; 
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat'; 
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BoatMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { wire, api } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';

const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];

export default class BoatDetailTabs extends LightningElement {
  @api boatId;
  label = {
    labelDetails,
    labelReviews,
    labelAddReview,
    labelFullDetails,
    labelPleaseSelectABoat,
  };

  @wire(getRecord, { recordId: '$boatId'. BOAT_FIELDS})
  wiredRecord;

  @wire(MessageContext) messageContext;
  
  get detailsTabIconName() { 
      return wiredRecord ? 'utility:anchor' : null;
  }
  
  get boatName() { 
    return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD);
  }
  
  subscription = null;   
  
  subscribeMC() {
    if (this.subscription || this.recordId) {
      return;
    }
    this.subscription = subscribe(this.messageContext, BOATMC, (message) => this.boatId = message.recordId, { scope: APPLICATION_SCOPE });
  }

  connectedCallback() { 
      this.subscribeMC();
  }
  
  // Navigates to record page
  navigateToRecordViewPage() { }
  
  // Navigates back to the review list, and refreshes reviews component
  handleReviewCreated() { }
}
