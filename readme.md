# api-tan-wrapper
> Little node wrapper for Tan API.

This little wrapper allow you to get all stations, can deliver similar stations name and time left for a station.

[![NPM](https://nodei.co/npm/api-tan-wrapper.png?downloads=true&downloadRank=true)](https://nodei.co/npm/api-tan-wrapper/)

[![npm version](https://badge.fury.io/js/api-tan-wrapper.svg)](https://badge.fury.io/js/api-tan-wrapper)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Toinane/api-tan-wrapper)
[![issues](https://img.shields.io/github/issues/Toinane/api-tan-wrapper.svg)](https://github.com/Toinane/api-tan-wrapper)
[![forks](https://img.shields.io/github/forks/Toinane/api-tan-wrapper.svg)](https://github.com/Toinane/api-tan-wrapper)
[![stars](https://img.shields.io/github/stars/Toinane/api-tan-wrapper.svg)](https://github.com/Toinane/api-tan-wrapper)

## Installation

`yarn add api-tan-wrapper`

## Usage

```javascript
const TanWrapper = require('api-tan-wrapper');
const tan = new TanWrapper({
    production: true, // default: false // You can use NODE_ENV = production too
    locale: 'fr_FR' // default: 'fr_FR'
});

// Get all stations
await tan.getAllStations();

// Get all tram stations
await tan.getAllTramStations();

// Get all bus stations
await tan.getAllBusStations();

// Get array of stations name
tan.parseStationsToList(stations); // stations here is the result of tan.getAllStations();

// Get similar stations name
tan.getSimilarStationsName('beauséjour', ['beaujoire', 'commerce', ...], 2); // 2 is the number of similar stations you want to get in return
```

## Licence
MIT @Toinane
