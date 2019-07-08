const axios = require('axios');

const apiUrl = 'http://open_preprod.tan.fr/ewp/';
const locale = 'fr_FR';

module.exports = {
  getStations: async (lat, long) => {
    let url = apiUrl;
    (long && lat) ? url += `arrets.json/${lat}/${long}` : url += 'arrets.json'

    try {
      const res = await axios.get(url);
      return res.data;
    }
    catch (err) {
      throw new Error(err);
    }
  },
  nextTramToStation: async station => {
    try {
      const res = await axios.get(apiUrl + station);
      return res.data;
    }
    catch (err) {
      throw new Error(err);
    }
  }
}