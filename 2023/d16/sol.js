const fs = require('fs');
const file = '2023/d16/input.txt';

function parse() {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.split(''));
}

const directionHelper = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
};
const reflectionHelper = {
  N: {
    '|': ['N'],
    '-': ['W', 'E'],
    '/': ['E'],
    '\\': ['W'],
    '.': ['N'],
    '#': ['N'],
  },
  S: {
    '|': ['S'],
    '-': ['W', 'E'],
    '/': ['W'],
    '\\': ['E'],
    '.': ['S'],
    '#': ['S'],
  },
  E: {
    '|': ['N', 'S'],
    '-': ['E'],
    '/': ['N'],
    '\\': ['S'],
    '.': ['E'],
    '#': ['E'],
  },
  W: {
    '|': ['N', 'S'],
    '-': ['W'],
    '/': ['S'],
    '\\': ['N'],
    '.': ['W'],
    '#': ['W'],
  },
};

let memo = {};

function energizePath(map, from, direction) {
  const memoKey = `${from[0]},${from[1]}-${direction}`;
  if (memo[memoKey]) {
    return null;
  }
  if (map[from[0]][from[1]] === '.') {
    map[from[0]][from[1]] = '#';
  } else if ('-|\\/'.includes(map[from[0]][from[1]])) {
    map[from[0]][from[1]] =
      map[from[0]][from[1]] + map[from[0]][from[1]].slice(0, 1);
  }
  from[0] += directionHelper[direction][0];
  from[1] += directionHelper[direction][1];
  while (map[from[0]]?.[from[1]] === '.' || map[from[0]]?.[from[1]] === '#') {
    map[from[0]][from[1]] = '#';
    from[0] += directionHelper[direction][0];
    from[1] += directionHelper[direction][1];
  }
  memo[memoKey] = true;
  if (map[from[0]]?.[from[1]]) {
    reflectionHelper[direction][map[from[0]][from[1]].slice(0, 1)].forEach(
      (newDirection) => {
        energizePath(map, [from[0], from[1]], newDirection);
      },
    );
  }
}

function sol1() {
  const map = parse();
  if (map[0][0] === '.' || map[0][0] === '-') {
    energizePath(map, [0, 0], 'E');
  } else if (map[0][0] === '\\' || map[0][0] === '|') {
    energizePath(map, [0, 0], 'S');
  } else {
    //Case trivial start with: /
    console.log(`Sol1: ${1}`);
    return null;
  }

  let energized = 0;
  map.forEach((row) => {
    row.forEach((col) => {
      if (col === '#' || col.length > 1) {
        energized++;
      }
    });
  });
  console.log(`Sol1: ${energized}`);
}

function sol2() {
  let data = parse();
  let max = 0;
  for (i = 0; i < data.length; i++) {
    // ->
    let cloneData = JSON.parse(JSON.stringify(data));
    memo = {};
    reflectionHelper['E'][cloneData[i][0]].forEach((newDirection) => {
      energizePath(cloneData, [i, 0], newDirection);
    });
    max = Math.max(
      max,
      cloneData.flat().filter((c) => c === '#' || c.length > 1).length,
    );
    // <-
    cloneData = JSON.parse(JSON.stringify(data));
    memo = {};
    reflectionHelper['W'][cloneData[i][cloneData[0].length - 1]].forEach(
      (newDirection) => {
        energizePath(cloneData, [i, cloneData[0].length - 1], newDirection);
      },
    );
    max = Math.max(
      max,
      cloneData.flat().filter((c) => c === '#' || c.length > 1).length,
    );
  }
  for (i = 0; i < data[0].length; i++) {
    // Down
    let cloneData = JSON.parse(JSON.stringify(data));
    memo = {};
    reflectionHelper['S'][cloneData[0][i]].forEach((newDirection) => {
      energizePath(cloneData, [0, i], newDirection);
    });
    max = Math.max(
      max,
      cloneData.flat().filter((c) => c === '#' || c.length > 1).length,
    );
    //Up
    cloneData = JSON.parse(JSON.stringify(data));
    memo = {};
    reflectionHelper['N'][
      cloneData[cloneData.length - 1][cloneData[0].length - 1]
    ].forEach((newDirection) => {
      energizePath(
        cloneData,
        [cloneData.length - 1, cloneData[0][cloneData[i].length - 1]],
        newDirection,
      );
    });
    max = Math.max(
      max,
      cloneData.flat().filter((c) => c === '#' || c.length > 1).length,
    );
  }
  console.log(`Sol2: ${max}`);
}

sol1();
sol2();
