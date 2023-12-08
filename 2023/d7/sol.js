const fs = require('fs');

const file = '2023/d7/input.txt';

function parse() {
  const data = fs.readFileSync(file, 'utf8').split('\n');
  return data.map((line) => ({
    hand: line.split(' ')[0],
    bid: Number(line.split(' ')[1]),
  }));
}

// A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2
//  M  L  K  J  I H  G  F  E  D  C  B A

const hashMap = {
  A: 'M',
  K: 'L',
  Q: 'K',
  J: 'J',
  T: 'I',
  9: 'H',
  8: 'G',
  7: 'F',
  6: 'E',
  5: 'D',
  4: 'C',
  3: 'B',
  2: 'A',
};
const hashMap2 = {
  A: 'M',
  K: 'L',
  Q: 'K',
  T: 'J',
  9: 'I',
  8: 'H',
  7: 'G',
  6: 'F',
  5: 'E',
  4: 'D',
  3: 'C',
  2: 'B',
  J: 'A',
};

function rencodeHand(hand) {
  const hash = {};
  hand.split('').forEach((c) => {
    hash[c] = hash[c] ? hash[c] + 1 : 1;
  });
  const values = Object.values(hash)
    .sort((a, b) => b - a)
    .join('');
  return `${values}${hand
    .split('')
    .map((c) => hashMap[c])
    .join('')}`;
}

function rencodeHand2(hand) {
  const hash = {};
  hand.split('').forEach((c) => {
    hash[c] = hash[c] ? hash[c] + 1 : 1;
  });
  if (hash['J'] && hash['J'] !== 5) {
    const JtoAdd = hash['J'];
    delete hash['J'];
    maxCount = Math.max(...Object.values(hash));
    const maxC = Object.keys(hash).find((c) => hash[c] === maxCount);
    hash[maxC] += JtoAdd;
  }
  const values = Object.values(hash)
    .sort((a, b) => b - a)
    .join('');
  return `${values}-${hand
    .split('')
    .map((c) => hashMap2[c])
    .join('')}`;
}

function sol1() {
  const data = parse();
  const sortedHands = data
    .map((d) => ({...d, value: rencodeHand(d.hand)}))
    .sort((a, b) => a.value.localeCompare(b.value));

  let score = 0;
  sortedHands.forEach((d, i) => {
    score += d.bid * (i + 1);
  });
  const uniqueHands = [...new Set(sortedHands.map((d) => d.hand))].length;
  console.log(`Unique Hands: ${uniqueHands}:${sortedHands.length}`);
  console.log(`SOl1: ${score}`, sortedHands);
}

function sol2() {
  const data = parse();
  const sortedHands = data
    .map((d) => ({...d, value: rencodeHand2(d.hand)}))
    .sort((a, b) => a.value.localeCompare(b.value));

  let score = 0;
  sortedHands.forEach((d, i) => {
    score += d.bid * (i + 1);
  });
  const uniqueHands = [...new Set(sortedHands.map((d) => d.hand))].length;
  console.log(`Unique Hands: ${uniqueHands}:${sortedHands.length}`);
  console.log(`Sol2: ${score}`, sortedHands);
}

sol2();
