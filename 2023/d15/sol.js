const fs = require('fs');
const file = '2023/d15/input.txt';

function hash(str) {
  let sum = 0;
  str.split('').forEach((char) => {
    sum += char.charCodeAt(0);
    sum *= 17;
    sum %= 256;
  });
  return sum;
}

function parse() {
  data = fs.readFileSync(file, 'ascii').split(',');
  return data;
}

function sol1() {
  const data = parse();
  const result = data.map((d) => hash(d));
  console.log(`Sol1: ${result.reduce((a, b) => a + b, 0)}`);
}

function sol2() {
  const data = parse();
  const boxes = new Array(256).fill(0).map((_) => []);
  data.forEach((d) => {
    const tag = d.split('-')[0].split('=')[0];
    const lens = Number(d.split('=')[1] ?? 0);
    const boxNum = hash(tag);
    if (d.includes('-')) {
      boxes[boxNum] = boxes[boxNum].filter((b) => b[0] !== tag);
    } else {
      const b = boxes[boxNum].find((b) => b[0] === tag);
      if (b) {
        b[1] = lens;
      } else {
        boxes[boxNum].push([tag, lens]);
      }
    }
  });
  let sum = 0;
  boxes.forEach((b, index) => {
    if (!b.length) {
      return;
    }
    let boxValue = 0;
    for (let i = 0; i < b.length; i++) {
      boxValue += (index + 1) * (i + 1) * b[i][1];
    }
    sum += boxValue;
  });
  console.log(`Sol2: ${sum}`);
}

sol1();
sol2();
