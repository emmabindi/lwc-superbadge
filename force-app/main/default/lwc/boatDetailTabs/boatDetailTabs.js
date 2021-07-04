import { LightningElement } from 'lwc';
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review'; 
import labelFullDetails from '@salesforce/label/c.Full_Details'; 
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat'; 
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { wire, api, track } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';

const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];

export default class BoatDetailTabs extends LightningElement {
  @track boatId;
  label = {
    labelDetails,
    labelReviews,
    labelAddReview,
    labelFullDetails,
    labelPleaseSelectABoat,
  };
  subscription = null;   

  @wire(getRecord, { recordId: '$boatId', fields: BOAT_FIELDS})
  wiredRecord;

  @wire(MessageContext) messageContext;
  
  get detailsTabIconName() { 
      return this.wiredRecord.data ? 'utility:anchor' : null;
  }
  
  get boatName() { 
    console.log('inside boatName');
    let name = getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD);
    console.log('name ' + name);
    return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD);
  }
  
  subscribeMC() {
    if (this.subscription) {
        console.log('were already subscribed');
      return;
    }
    this.subscription = subscribe(
        this.messageContext, 
        BOATMC, 
        (message) => {
            this.boatId = message.recordId;
            console.log('this.boatId ' + this.boatId);
            console.log('message ' + JSON.stringify(message));
        },
        { scope: APPLICATION_SCOPE }
    );
  }

  connectedCallback() { 
      this.subscribeMC();
  }
  
  // Navigates to record page
  navigateToRecordViewPage() { }
  
  // Navigates back to the review list, and refreshes reviews component
  handleReviewCreated() { 
      /*
    The function handleReviewCreated() must set the <lightning-tabset> 
    Reviews tab to active using querySelector() and activeTabValue, 
    and refresh the boatReviews component dynamically.
      */
  }
}
