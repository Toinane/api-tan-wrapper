const axios = require('axios');
const levenshtein = require('fast-levenshtein');

const preprod_url = 'http://open_preprod.tan.fr/ewp/';
const prod_url = 'http://open.tan.fr/ewp/'

class TanWrapper {
  constructor(options = {}) {
    this.apiUrl = (options.production || process.env.NODE_ENV === 'production') ? prod_url : preprod_url;
    this.locale = (options.locale) ? options.locale : 'fr_FR';
    this.totalTramLine = 3;
  }

  async request(url) {
    return axios.get(this.apiUrl + url, {
      headers: {
        'Accept-language': this.locale
      }
    });
  }

  async getAllStations() {
    try {
      const response = await this.request('arrets.json');
      return response.data;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async getAllTramStations() {
    const stations = await this.getAllStations();

    return stations.filter(station => {
      const lignes = station.ligne.filter(ligne => parseInt(ligne.numLigne) <= this.totalTramLine)
      return lignes.length > 0;
    })
  }

  async getAllBusStations() {
    const stations = await this.getAllStations();

    return stations.filter(station => {
      const lignes = station.ligne.filter(ligne => parseInt(ligne.numLigne) <= this.totalTramLine)
      return lignes.length < station.ligne.length;
    })
  }

  parseStationsToList(stations) {
    return stations.map(station => station.libelle);
  }

  getSimilarStationsName(stationName, stations, numberToKeep = 3) {
    let levelStations = [];
    stations.map(station => {
      const level = levenshtein.get(stationName, station);
      levelStations.push({name: station, level: level});
    })

    levelStations.sort((current, next) => current.level - next.level)
    return levelStations.slice(0, numberToKeep);
  }


}

module.exports = TanWrapper;