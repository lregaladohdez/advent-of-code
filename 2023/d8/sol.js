const fs = require('fs');
const file = '2023/d8/input.txt';

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function lcmArray(numbers) {
  if (numbers.length < 2) {
    throw new Error('At least two numbers are required to calculate the LCM.');
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}

function parse() {
  const data = fs.readFileSync(file, 'utf8').split('\n');
  const path = data[0].split('').map((c) => (c == 'L' ? 0 : 1));
  nodes = {};

  for (let i = 2; i < data.length; i++) {
    if (!data[i]) {
      continue;
    }
    [head, left, right] = data[i].match(/\w+/g);
    nodes[head] = [left, right];
  }
  return {path, nodes};
}

function sol1() {
  const {path, nodes, start} = parse();
  let steps = 0;
  let currentNode = 'AAA';
  while (currentNode !== 'ZZZ') {
    currentNode = nodes[currentNode][path[steps++ % path.length]];
  }
  console.log('Sol1:', steps, currentNode);
}
function sol2() {
  const {path, nodes, start} = parse();
  const startingNodes = Object.keys(nodes).filter((n) => n.match(/.?.?A/));
  const distancestoZ = startingNodes.map((n) => {
    let currentNode = `${n}`;
    steps = 0;
    while (!currentNode.match(/.?.?Z/)) {
      currentNode = nodes[currentNode][path[steps++ % path.length]];
    }
    return steps;
  });
  console.log(distancestoZ);
  console.log('Sol2:', lcmArray(distancestoZ));
}

sol2();
