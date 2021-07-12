import { LightningElement } from 'lwc';
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review'; 
import labelFullDetails from '@salesforce/label/c.Full_Details'; 
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat'; 
import BOAT_OBJECT from '@salesforce/schema/Boat__c';
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import BOAT_TYPE_FIELD from '@salesforce/schema/Boat__c.BoatType__c';
import BOAT_LENGTH_FIELD from '@salesforce/schema/Boat__c.Length__c';
import BOAT_PRICE_FIELD from '@salesforce/schema/Boat__c.Price__c';
import BOAT_DESCRIPTION_FIELD from '@salesforce/schema/Boat__c.Description__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { wire, api, track } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, subscribe } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';

const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];
export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
  @api boatId;
  @api boatObject = BOAT_OBJECT;

  label = {
    labelDetails,
    labelReviews,
    labelAddReview,
    labelFullDetails,
    labelPleaseSelectABoat,
  };
  subscription = null;
  typeField = BOAT_TYPE_FIELD;
  priceField = BOAT_PRICE_FIELD;
  descriptionField = BOAT_DESCRIPTION_FIELD;   
  lengthField = BOAT_LENGTH_FIELD;

  @wire(getRecord, { recordId: '$boatId', fields: BOAT_FIELDS})
  wiredRecord;

  @wire(MessageContext) messageContext;
  
  get detailsTabIconName() { 
      console.log('inside tab icon');
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
  
  navigateToRecordViewPage() {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: this.boatId,
        objectApiName: this.boatObject,
        actionName: 'view'
      }
    });
   }
  
  // Navigates back to the review list, and refreshes reviews component
  handleReviewCreated() { 
      /*
    The function handleReviewCreated() must set the <lightning-tabset> 
    Reviews tab to active using querySelector() and activeTabValue, 
    and refresh the boatReviews component dynamically.
      */
  }
}
