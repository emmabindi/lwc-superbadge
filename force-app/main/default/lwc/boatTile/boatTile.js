import { LightningElement, api } from "lwc";

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';
export default class BoatTile extends LightningElement {
    @api boat;
    @api selectedBoatId;
    
    get backgroundStyle() {
      const pictureUrl = this.boat.Picture__c;
      return `background-image:url(${pictureUrl})`;
     }

    get tileClass() { 
      if (this.selectedBoatId == this.boat.Id) {
        return TILE_WRAPPER_SELECTED_CLASS; 
      } else {
        return TILE_WRAPPER_UNSELECTED_CLASS;
      }
    }
    
    selectBoat() { 
      console.log('inside selectBoat in boatTile');
      this.selectedBoatId = this.boat.Id;
      const boatSelect = new CustomEvent('boatselect', {detail: {boatId: this.selectedBoatId}});
      this.dispatchEvent(boatSelect);
    }
  }
  