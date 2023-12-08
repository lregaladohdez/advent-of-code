const fs = require('fs');

function sol1() {
  const lines = fs.readFileSync('2023/d1/input.txt', 'utf8').split('\n');
  let sum = 0;
  lines.forEach((l) => {
    if (!l) {
      return;
    }
    const numbers = l.match(/\d/g);
    sum += Number(numbers[0] + numbers[numbers.length - 1]);
  });
  console.log(`Sol1: ${sum}`);
}

const hashMap = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function sol2() {
  const lines = fs.readFileSync('2023/d1/input.txt', 'utf8').split('\n');
  let sum = 0;
  lines.forEach((l, i) => {
    if (!l) {
      return;
    }
    const numbers = Array.from(
      l.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
      (x) => hashMap[x[1]],
    );
    sum += numbers[0] * 10 + numbers[numbers.length - 1];
  });
  console.log(`Sol2: ${sum}`);
}

sol2();
