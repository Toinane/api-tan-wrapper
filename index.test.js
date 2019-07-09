const TanWrapper = require('./index');

async function main() {
  const tan = new TanWrapper();
  const stations = await tan.getAllStations();
  console.log(stations)
}

(main)()