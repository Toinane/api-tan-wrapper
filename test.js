const tan = require('./index');

async function main() {
  const stations = await tan.getStations();

  let result = [];

  stations.map(station => {
    let place = {
      value: station.libelle,
      synonyms: []
    }

    if(station.ligne.filter(l => l.numLigne == 1 || l.numLigne == 2 || l.numLigne == 3).length > 0) {
      result.push(place);
    }
  })

  console.log(result)
}

(main)()