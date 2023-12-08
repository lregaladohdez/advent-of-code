const fs = require('fs');
const file = '2023/d6/input.txt';

function parse() {
  const data = fs.readFileSync(file, 'utf8').split('\n');
  const times = data[0].match(/\d+/g).map(Number);
  const distances = data[1].match(/\d+/g).map(Number);
  return {times, distances};
}

function parse2() {
  const data = fs.readFileSync(file, 'utf8').split('\n');
  const times = [Number(data[0].match(/\d+/g).join(''))];
  const distances = [Number(data[1].match(/\d+/g).join(''))];
  return {times, distances};
}

//v = d / t;
function positiveInterval(a, b, c) {
  const x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  //   console.log(x1, x2);
  return x2 > x1
    ? [Math.floor(x1) + 1, Math.ceil(x2) - 1]
    : [Math.ceil(x2) + 1, Math.ceil(x1) - 1];
}

function sol1() {
  const data = parse();
  let total = 1;
  for (let i = 0; i < data.times.length; i++) {
    const [min, max] = positiveInterval(-1, data.times[i], -data.distances[i]);
    total *= max - min + 1;
  }
  console.log(`Sol1: ${total}`);
}

function sol2() {
  const data = parse2();
  let total = 1;
  for (let i = 0; i < data.times.length; i++) {
    const [min, max] = positiveInterval(-1, data.times[i], -data.distances[i]);
    total *= max - min + 1;
  }
  console.log(`Sol2: ${total}`);
}

sol2();
