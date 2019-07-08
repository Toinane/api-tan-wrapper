const TanWrapper = require('./index');

async function main() {
  const tan = new TanWrapper();

  const station = await tan.getWaitingTimeFromStation('ded', 'name');

  console.log(station)
}

(main)()