const fs = require('fs');

function parse() {
  const data = fs.readFileSync('2023/d3/input.txt', 'utf8');
  const map = data.split('\n').map((line) =>
    line.split('').map((item) => {
      if (item.match(/\d/)) {
        return item;
      }
      if (item.match(/\./)) {
        return null;
      }
      return '*';
    }),
  );
  return map;
}
function extract(map, row, col) {
  let start = col;
  while (map[row][--start] && map[row][start] !== '*') {}
  let end = col;
  while (map[row][++end] && map[row][end] !== '*') {}
  const num = +map[row].slice(start + 1, end).join('');
  console.log(map[row].slice(start + 1, end));
  return {pos: `${row}-${start + 1}`, num};
}

function sol1() {
  const map = parse();
  console.log(map);
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  const numbers = {};
  map.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === '*') {
        directions.forEach((dir) => {
          if (map[i + dir[0]][j + dir[1]]) {
            const item = extract(map, i + dir[0], j + dir[1]);
            numbers[item.pos] = item.num;
          }
        });
      }
    });
  });
  const selected = Object.values(numbers);
  console.log(
    `Result SOL1:`,
    selected.reduce((a, x) => a + x, 0),
  );
}

function sol2() {
  const map = parse();
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  let gearsRatio = 0;
  map.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === '*') {
        const gears = {};
        directions.forEach((dir) => {
          if (map[i + dir[0]][j + dir[1]]) {
            const item = extract(map, i + dir[0], j + dir[1]);
            gears[item.pos] = item.num;
          }
        });
        if (Object.keys(gears).length === 2) {
          gearsRatio += Object.values(gears).reduce((a, x) => a * x, 1);
        }
      }
    });
  });
  console.log(`Result SOL2:`, gearsRatio);
}

sol2();
