import { LightningElement, api } from "lwc";

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';
export default class BoatTile extends LightningElement {
    @api boat;
    @api selectedBoatId;
    
    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
      const pictureUrl = this.boat.Picture__c;
      return `background-image:url(${pictureUrl})`;
     }

    get tileClass() { 
      if (this.selectedBoatId) {
        return TILE_WRAPPER_SELECTED_CLASS; 
      } else {
        return TILE_WRAPPER_UNSELECTED_CLASS;
      }
    }
    
    // Fires event with the Id of the boat that has been selected.
    /*So make sure to add the required logic into selectBoat() to send the 
    correct detail information, assigning boat.Id to boatId and then adding it to a 
    custom event named boatselect, so the boatSearchResults component can propagate
     the event using the message service. Make sure you are wiring the messageContext
      in the boatSearchResults component in order to publish the message.*/
    selectBoat(event) { 
      console.log('inside selectBoat');
      //console.log(event.detail);
      //const boatSelect = new CustomEvent('boatselect', {detail: {boatId: this.boat.Id}});
    }
  }
  