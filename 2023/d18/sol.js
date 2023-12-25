const fs = require('fs');
const file = '2023/d18/input.txt';

function parse() {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((l) => l)
    .map((l) => ({
      direction: l.split(' ')[0],
      dig: Number(l.split(' ')[1]),
      color: l.split('(')[1].split(')')[0],
    }));
}

function parse2() {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((l) => l)
    .map((l) => ({
      direction: directionHelper2[l.split(')')[0].split('').pop()],
      dig: parseInt(l.split('#')[1].slice(0, 5), 16),
      color: null,
    }));
}

function createPoints(data) {
  const points = [[0, 0, 0, 0]];
  let current = [0, 0];
  data.forEach((element) => {
    current[0] += directionHelper[element.direction][0] * element.dig;
    current[1] += directionHelper[element.direction][1] * element.dig;
    points.push([...current, element.dig, element.color]);
  });
  return points;
}

const directionHelper = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};
const directionHelper2 = {
  0: 'R',
  1: 'D',
  2: 'L',
  3: 'U',
};

function sol1() {
  const coord = createPoints(parse());
  let A = 0;
  let b = 0;
  coord.forEach((c, i) => {
    const prev = (i + coord.length - 1) % coord.length;
    const next = (i + 1) % coord.length;
    A += c[0] * (coord[prev][1] - coord[next][1]);
    b += c[2];
  });
  A = Math.floor(Math.abs(A / 2));
  const i = Math.floor(A - b / 2) + 1;
  console.log(`Sol1:${i + b}`);
}

function sol2() {
  const coord = createPoints(parse2());
  let A = 0;
  let b = 0;
  coord.forEach((c, i) => {
    const prev = (i + coord.length - 1) % coord.length;
    const next = (i + 1) % coord.length;
    A += c[0] * (coord[prev][1] - coord[next][1]);
    b += c[2];
  });
  A = Math.floor(Math.abs(A / 2));
  const i = Math.floor(A - b / 2) + 1;
  console.log(`Sol2: ${i + b}`);
}

sol1();
sol2();
