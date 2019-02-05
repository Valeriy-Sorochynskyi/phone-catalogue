const PhoneService = {
  getAll({ query = "", sortBy = "" } = {}, callback) {
    let url =
      "https://mate-academy.github.io/phone-catalogue-static/phones/phones.json";

    this._sendRequest(url, phonesFromServer => {
      const filteredPhones = this._filter(phonesFromServer, query);
      const sortedPhones = this._sortBy(filteredPhones, sortBy);
      callback(sortedPhones);
    });
  },

  getById(phoneId, callback) {
    let url = `https://mate-academy.github.io/phone-catalogue-static/phones/${phoneId}.json`;
    this._sendRequest(url, callback);
  },

  _sendRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log(`${xhr.status} , ${xhr.statusText}`);

        return {};
      }
      const data = JSON.parse(xhr.responseText);
      callback(data);
    };
  },

  _filter(phones, query) {
    return phones.filter(phone => {
      return phone["name"].toLowerCase().includes(query.toLowerCase());
    });
  },

  _sortBy(phones, sortBy) {
    if (sortBy === "age") {
      return phones.sort((a, b) => {
        return a["age"] - b["age"];
      });
    }

    if (sortBy === "name") {
      return phones.sort((a, b) => {
        if (a["name"] > b["name"]) {
          return 1;
        }
        if (a["name"] < b["name"]) {
          return -1;
        }
      });
    }
  }
};

export default PhoneService;
