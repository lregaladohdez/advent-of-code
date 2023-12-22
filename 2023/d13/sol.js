const fs = require('fs');
const file = '2023/d13/input.txt';

function parse() {
  const data = fs
    .readFileSync(file, 'utf8')
    .split('\n\n')
    .map((puzzle) => puzzle.split('\n'));
  return data;
}

function findHorizontalReflection(puzzle) {
  for (let i = 1; i < puzzle.length; i++) {
    const bottom = puzzle.slice(i);
    const top = puzzle.slice(0, i).reverse().slice(0, bottom.length);
    if (bottom.join('').startsWith(top.join(''))) {
      return i;
    }
  }
  return 0;
}
function findHorizontalQuasiReflection(puzzle) {
  for (let i = 1; i < puzzle.length; i++) {
    const bottom = puzzle.slice(i);
    const top = puzzle.slice(0, i).reverse().slice(0, bottom.length);

    const line = bottom.join('');
    const diff = top
      .join('')
      .split('')
      .reduce((acc, c, i) => acc + (c !== line[i] ? 1 : 0), 0);
    if (diff == 1) {
      return i;
    }
  }
  return 0;
}

function transpose(p) {
  const t = [];
  for (let i = 0; i < p[0].length; i++) {
    t.push(p.map((r) => r[i]).join(''));
  }
  return t;
}

function sol1() {
  const puzzles = parse();
  const horizontalMatchs = puzzles.map(
    (p) =>
      findHorizontalReflection(p) * 100 ||
      findHorizontalReflection(transpose(p)),
  );
  console.log(`Sol1: ${horizontalMatchs.reduce((a, b) => a + b, 0)}`);
}

function sol2() {
  const puzzles = parse();
  const horizontalMatchs = puzzles.map(
    (p) =>
      findHorizontalQuasiReflection(p) * 100 ||
      findHorizontalQuasiReflection(transpose(p)),
  );
  console.log(`Sol2: ${horizontalMatchs.reduce((a, b) => a + b, 0)}`);
}

sol1();
sol2();
