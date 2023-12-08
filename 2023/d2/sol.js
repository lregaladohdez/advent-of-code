const fs = require('fs');
const {inspect} = require('util');

function parse() {
  const data = fs.readFileSync('2023/d2/input.txt', 'utf8');
  const lines = data.split('\n');
  const games = lines.map((line) => ({
    id: +line.match(/Game (\d+)/)[1],
    plays: line
      .split(':')[1]
      .split(';')
      .map((play) => ({
        red: +(play.match(/(\d+) red/)?.[1] || 0),
        blue: +(play.match(/(\d+) blue/)?.[1] || 0),
        green: +(play.match(/(\d+) green/)?.[1] || 0),
      })),
  }));
  return games;
}

function isPosible(config, plays) {
  const result = plays.every(
    (p) =>
      p.red <= config.red && p.blue <= config.blue && p.green <= config.green,
  );
  return result;
}
function power(plays) {
  const minCubes = plays.reduce(
    (acc, p) => ({
      red: Math.max(acc.red, p.red),
      blue: Math.max(acc.blue, p.blue),
      green: Math.max(acc.green, p.green),
    }),
    {red: 0, blue: 0, green: 0},
  );
  return minCubes.red * minCubes.blue * minCubes.green;
}

function sol1() {
  const games = parse();
  config = {red: 12, blue: 14, green: 13};

  let idSum = 0;
  games.forEach((g) => {
    if (isPosible(config, g.plays)) {
      idSum += g.id;
    }
  });
  console.log(idSum);
}

function sol2() {
  const games = parse();
  const totalPower = games.reduce((acc, g) => acc + power(g.plays), 0);
  console.log(totalPower);
}

sol1();
sol2();
