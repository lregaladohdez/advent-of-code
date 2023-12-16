const fs = require('fs');
const file = '2023/d10/input.txt';

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

//row-col
const directions = {
  north: [-1, 0],
  south: [1, 0],
  east: [0, 1],
  west: [0, -1],
};

const connectionMap = {
  '|': [directions.north, directions.south],
  '-': [directions.west, directions.east],
  L: [directions.north, directions.east],
  J: [directions.north, directions.west],
  7: [directions.south, directions.west],
  F: [directions.south, directions.east],
  '.': [],
};

function parse() {
  const data = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.split(''));
  const three = {};
  let starting = {x: 0, y: 0};
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] === 'S') {
        starting = {x: row, y: col};
        continue;
      }
      const connections = connectionMap[data[row][col]].map(
        (c) => `${row + c[0]}-${col + c[1]}`,
      );
      three[`${row}-${col}`] = connections;
    }
  }
  // complete node:
  const startingNodeConnections = [];
  Object.values(directions).forEach((d) => {
    const node = three[`${starting.x + d[0]}-${starting.y + d[1]}`]?.find(
      (c) => c === `${starting.x}-${starting.y}`,
    );
    if (node)
      startingNodeConnections.push(`${starting.x + d[0]}-${starting.y + d[1]}`);
  });

  three[`${starting.x}-${starting.y}`] = startingNodeConnections;

  return [starting, three, data];
}

function cycleElements(starting, three) {
  const visited = {};
  const queue = [`${starting.x}-${starting.y}`];
  while (queue.length) {
    const node = queue.pop();
    if (visited[node]) continue;
    visited[node] = true;
    three[node].forEach((c) => {
      queue.push(c);
    });
  }
  return visited;
}

function sol1() {
  const [starting, three] = parse();
  const visited = cycleElements(starting, three);

  console.log('Sol1:', Math.floor(Object.keys(visited).length / 2));
}

function freeInDirection(i, j, fence, data) {
  let parity = 0;
  const pos = `${i}-${j}`;
  let path = '';
  cross = ['JF', '7L'];
  while (data[i]?.[--j]) {
    if (fence[`${i}-${j}`]) {
      if (data[i][j] === '-') {
        continue;
      }
      if (data[i][j] === '|') {
        parity++;
        path = '';
        continue;
      }
      path += data[i][j];

      if (path.length === 2) {
        if (cross.includes(path)) {
          parity++;
        }
        path = '';
      }
    }
  }
  return parity;
}

function findS({x, y}, data) {
  // L is a 90-degree bend connecting north and east.
  if ('-J7'.includes(data[x][y + 1]) && '-LF'.includes(data[x][y - 1])) {
    return '-';
  }
  if ('|7F'.includes(data[x - 1]?.[y]) && '|JL'.includes(data[x + 1]?.[y])) {
    return '|';
  }
  if ('-J7'.includes(data[x][y + 1]) && '|LJ'.includes(data[x + 1][y])) {
    return 'F';
  }
  if ('|7F'.includes(data[x - 1]?.[y]) && '-FL'.includes(data[x][y - 1])) {
    return 'J';
  }

  if ('|JL'.includes(data[x + 1]?.[y]) && '-FL'.includes(data[x][y - 1])) {
    return '7';
  }

  return 'L';
}

function sol2() {
  const [starting, three, data] = parse();
  const circledNodes = [];
  const fence = cycleElements(starting, three);
  data[starting.x][starting.y] = findS(starting, data);
  console.log('Replaced S:', data[starting.x][starting.y]);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (
        data[i][j] &&
        !fence[`${i}-${j}`] &&
        freeInDirection(i, j, fence, data) % 2 === 1
      ) {
        circledNodes.push(`${i}-${j}`);
      }
    }
  }
  console.log('Sol2:', circledNodes.length);
}

sol2();
