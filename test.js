const TanWrapper = require('./index');

async function main() {
  const tan = new TanWrapper();

  const stations = await tan.getAllStations();
  const similar = tan.getSimilarStationsName('beausejour', tan.parseStationsToList(stations), 10);

  console.log(similar)
}

(main)()