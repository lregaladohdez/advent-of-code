const fs = require('fs');
const file = '2023/d11/input.txt';

function parse(file) {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((l) => l)
    .map((l) => l.split(''));
}

function expand(universe) {
  let newUniverse = [];
  universe.forEach((r) => {
    newUniverse.push(r);
    if (r.every((c) => c === '.')) {
      newUniverse.push(new Array(universe[0].length).fill('.'));
    }
  });
  let insertedCols = 0;
  for (let i = 0; i < universe[0].length; i++) {
    if (universe.map((r) => r[i]).every((c) => c === '.')) {
      newUniverse = newUniverse.map((r) =>
        r
          .slice(0, i + insertedCols)
          .concat(['.'])
          .concat(r.slice(i + insertedCols)),
      );
      insertedCols++;
    }
  }
  return newUniverse;
}

function expansionIndexes(universe) {
  const rows = [];
  const columns = [];
  universe.forEach((r, i) => {
    if (r.every((c) => c === '.')) {
      rows.push(i);
    }
  });
  universe[0].forEach((_, i) => {
    if (universe.map((r) => r[i]).every((c) => c === '.')) {
      columns.push(i);
    }
  });
  return {rows, columns};
}

function reIndexPoint(point, indexes) {
  return [
    indexes.rows.filter((i) => i < point[0]).length * 1000000 +
      point[0] -
      indexes.rows.filter((i) => i < point[0]).length,
    indexes.columns.filter((i) => i < point[1]).length * 1000000 +
      point[1] -
      indexes.columns.filter((i) => i < point[1]).length,
  ];
}

function galaxiesCoordinates(universe) {
  let coordinates = [];
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === '#') {
        coordinates.push([i, j]);
      }
    }
  }
  return coordinates;
}

function sol1() {
  const universe = parse(file);
  const expandedUniverse = expand(universe);

  const galaxies = galaxiesCoordinates(expandedUniverse);
  const distances = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      distances.push(
        Math.abs(galaxies[i][0] - galaxies[j][0]) +
          Math.abs(galaxies[i][1] - galaxies[j][1]),
      );
    }
  }
  console.log(
    'Sol1:',
    distances.reduce((a, b) => a + b, 0),
  );
}

function sol2() {
  const universe = parse(file);
  const indices = expansionIndexes(universe);
  const galaxies = galaxiesCoordinates(universe).map((p) =>
    reIndexPoint(p, indices),
  );
  const distances = [];

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      distances.push(
        Math.abs(galaxies[i][0] - galaxies[j][0]) +
          Math.abs(galaxies[i][1] - galaxies[j][1]),
      );
    }
  }
  console.log(
    'Sol2:',
    distances.reduce((a, b) => a + b, 0),
  );
}

sol2();
