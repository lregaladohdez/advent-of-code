const fs = require('fs');
const file = '2023/d14/input.txt';

function parse() {
  const data = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.split(''));
  return data;
}

function transpose(data) {
  const transposed = [];
  for (let i = 0; i < data[0].length; i++) {
    transposed.push(data.map((d) => d[i]));
  }
  return transposed;
}

function sol1() {
  const data = transpose(parse());
  let weight = 0;
  data.forEach((col) => {
    for (i = 0; i < col.length; i++) {
      if (col[i] !== 'O') {
        continue;
      }
      col[i] = '.';
      let newCol = i;
      while (col[newCol] == '.') {
        newCol--;
      }
      col[newCol + 1] = 'O';
      weight += col.length - newCol - 1;
    }
  });
  console.log(`Sol1: ${weight}`);
}

function sol2() {
  let data = parse();
  const hash = {};
  let k = 0;
  for (k = 0; k < 1000000000; k++) {
    const input = data.map((d) => d.join('')).join('\n');
    if (input in hash) {
      break;
    }
    [
      [-1, 0], //North
      [0, -1], //West
      [1, 0], //South
      [0, 1], //East
    ].forEach((d) => {
      for (
        let row = d[0] === 1 ? data.length - 1 : 0;
        (d[0] === 1 && row >= 0) || (d[0] !== 1 && row < data.length);
        row += d[0] === 1 ? -1 : 1
      ) {
        for (
          let col = d[1] === 1 ? data[row].length - 1 : 0;
          (d[1] === 1 && col >= 0) || (d[1] !== 1 && col < data[row].length);
          col += d[1] === 1 ? -1 : 1
        ) {
          let [i, j] = [row, col];
          if (data[i][j] !== 'O') {
            continue;
          }

          data[i][j] = '.';
          while (data[i]?.[j] === '.') {
            i += d[0];
            j += d[1];
          }
          data[i - d[0]][j - d[1]] = 'O';
        }
      }
      //   console.log('\nAfter ', d);
      //   console.log(data.map((d) => d.join('')).join('\n'));
      hash[input] = data.map((d) => d.join('')).join('\n');
    });
  }

  let cycleStart = data.map((d) => d.join('')).join('\n');
  let step = `${cycleStart}`;
  let cycleLength = 1;

  while (cycleStart !== hash[step]) {
    cycleLength++;
    step = hash[step];
  }
  for (let z = 0; z < (1000000000 - k) % cycleLength; z++) {
    cycleStart = hash[cycleStart];
  }
  data = cycleStart.split('\n').map((l) => l.split(''));
  let sum = 0;
  let value = data.length;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 'O') {
        sum += value;
      }
    }
    value -= 1;
  }
  console.log(`Sol2: ${sum}`);
}

sol1();
sol2();
