

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './services/phone-service.js';

export default class PhonePages {
  constructor({ element }) {
    this._element = element;

    this._render();
    
    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
 
    });

    this._catalog.subscribe('phone-selected', (phoneId) => {
      const phoneDetails = PhoneService.getById(phoneId);

      this._catalog.hide();
      this._viewer.show(phoneDetails);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._catalog.show();
      this._viewer.hide();
    });
  }

  _initShoppingCart() {
    this._cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._cart = new Filter({
      element: document.querySelector('[data-component="filter"]'),
    });
  }
  

  
  _render() {
    this._element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="filter"></div>
          </section>
  
          <section>
            <div data-component="shopping-cart"></div>
          </section>
        </div>
  
        <!--Main content-->
        <div class="col-md-10">
        
        <div data-component="phone-viewer" hidden></div>
        <div data-component="phone-catalog"></div>
  
        </div>
      </div>
        `;
  }
}
