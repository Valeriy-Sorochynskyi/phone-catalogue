const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
// const BASE_URL = 'http://localhost:8080';

const PhoneService = {

  async getAll({ query = '', sortBy = '' } = {}) {
    const phonesFromServer = await this._sendRequest('/phones');

    const filteredPhones = this._filter(phonesFromServer, query);
    const sortedPhones = this._sortBy(filteredPhones, sortBy);

    return sortedPhones;
  },

  getById(phoneId) {
    return this._sendRequest(`/phones/${phoneId}`);
  },

  _sendRequest(url) {
    return fetch(`${BASE_URL + url }.json`)
      .then(response => response.json())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error);

        return Promise.reject(error);
      });
  },


  _filter(phones, query) {
    const regexp = new RegExp(query, 'i');

    return phones.filter(phone => regexp.test(phone.name));
  },

  _sortBy(phones, sortBy) {
    if (sortBy === 'age') {
      return phones.sort((a, b) => a.age - b.age);
    }

    if (sortBy === 'name') {
      return phones.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    return [];
  },
};

export default PhoneService;
