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

  async getStationsWithLocation(latitude, longitude) {
    latitude.replace('.', ',');
    longitude.replace('.', ',');

    try {
      const response = await this.request("arrets.json/${latitude}/${longitude}");
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

  async getWaitingTimeFromStation(station, type = 'code') {
    if (type === 'name') {
      try {
        const result = await this.getStationFromStationName(station);
        station = result.codeLieu;
      }
      catch(error) {
        throw new Error('You send a name that didn\'t exist : ' + station);
      }
    }

    try {
      const response = await this.request("tempsattente.json/${station}");
      return response.data;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async getTimesFromStation(station, type = 'code', line, direction) {
    if (type === 'name') {
      try {
        const result = await this.getStationFromStationName(station);
        station = result.codeLieu;
      }
      catch (error) {
        throw new Error('You send a name that didn\'t exist : ' + station);
      }
    }

    try {
      const response = await this.request("horairesarret.json/${station}/${line}/${direction}");
      return response.data;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async getStationFromCode(code) {
    const stations = await this.getAllStations();

    return stations.filter(station => station.codeLieu.toLowerCase() === code.toLowerCase())[0];
  }

  async getStationFromStationName(stationName) {
    const stations = await this.getAllStations();

    return stations.filter(station => station.libelle.toLowerCase() === stationName.toLowerCase())[0];
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