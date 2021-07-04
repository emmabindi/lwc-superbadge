import { api } from 'lwc';
import fiveStar from '@salesforce/resourceUrl/fivestar';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

const ERROR_TITLE = 'Error loading five-star';
const ERROR_VARIANT = 'Error';
const EDITABLE_CLASS = 'c-rating';
const READ_ONLY_CLASS = 'readonly c-rating';
export default class FiveStarRating extends LightningElement {
  @api readOnly;
  @api value;

  editedValue;
  isRendered;

  get starClass() {
    return this.readOnly ? READ_ONLY_CLASS : EDITABLE_CLASS;
  }

  // Render callback to load the script once the component renders.
  renderedCallback() {
    if (this.isRendered) {
      return;
    }
    this.loadScript();
    this.isRendered = true;
  }

  //Method to load the 3rd party script and initialize the rating.
  //call the initializeRating function after scripts are loaded
  //display a toast with error message if there is an error loading script
  loadScript() {
    loadScript(this, fivestar + '/rating.js'),
    loadStyle(this, fivestar + '/rating.css').then(() => {
        console.log('inside then ');
        this.initializeRating();
    }).catch((error) => {
      console.log('error ' + error);
      this.dispatchEvent(new ShowToastEvent({
        title: ERROR_TITLE,
        variant: ERROR_VARIANT
      }));
    });
  }

  initializeRating() {
    let domEl = this.template.querySelector('ul');
    let maxRating = 5;
    let self = this;
    let callback = function (rating) {
      self.editedValue = rating;
      self.ratingChanged(rating);
    };
    this.ratingObj = window.rating(
      domEl,
      this.value,
      maxRating,
      callback,
      this.readOnly
    );
  }

  // Method to fire event called ratingchange with the following parameter:
  // {detail: { rating: CURRENT_RATING }}); when the user selects a rating
  ratingChanged(rating) {
    this.dispatchEvent(new CustomEvent('ratingchange', {
      detail: { rating: CURRENT_RATING}
    }));
  }
}