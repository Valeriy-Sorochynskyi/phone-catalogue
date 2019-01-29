import Component from '../../component.js';

export default class PhoneViewer extends Component {
    constructor( {element, onBack} ){
      super({element});

      this._onBack = onBack;
      this._element.addEventListener('click', (event) => {
        const backBatton = event.target.closest('[data-element="back-button"]');

        if (!backBatton) {
          return;
        }

        this._onBack();
      })
    }
    
    show(phoneDetails){
      this._phoneDetails = phoneDetails;
      super.show();
      this._render();
    }

    _render() {

      const phone = this._phoneDetails;


      this._element.innerHTML = `
        <img class="phone" src="${ phone.images[0] }">
        
        <button data-element="back-button">
          Back
        </button>
        <button>Add to basket</button>
    
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
    
        <ul class="phone-thumbs">
          <li>
            <img src="${ phone.images[0] }">
          </li>
          <li>
            <img src="${ phone.images[1] }">
          </li>
          <li>
            <img src="${ phone.images[2] }">
          </li>
          <li>
            <img src="${ phone.images[3] }">
          </li>
          
        </ul>
      `;
    }
  }

