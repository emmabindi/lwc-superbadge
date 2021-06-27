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
    
    /*
     Make sure you are wiring the messageContext in the boatSearchResults component
    in order to publish the message.*/
    selectBoat() { 
      console.log('inside selectBoat in boatTile');
      console.log(this.boat.Id);
      this.selectedBoatId = this.boat.Id;
      const boatSelect = new CustomEvent('boatselect', {detail: {boatId: this.selectedBoatId}});
      console.log('event: ' + boatSelect);
      console.log('event detail: ' + boatSelect.detail.boatId);
      this.dispatchEvent(boatSelect);
    }
  }
  