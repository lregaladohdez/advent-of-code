const fs = require('fs');
const file = '2023/d12/input.txt';

function parse() {
  const data = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((l) => l);
  const patterns = data.map((l) => l.split(' ')[0]);
  const groups = data.map((l) => l.split(' ')[1].match(/\d+/g).map(Number));
  return {patterns, groups};
}

function combinationsInPattern(pattern, groups) {
  //   if (`${pattern}-${groups.join('-')}-${line}` in memo) {
  //     return memo[`${pattern}-${groups.join('-')}-${line}`];
  //   }
  const queue = [{groups, line: ''}];
  const solutions = {};
  const analyzed = {};
  while (queue.length) {
    const {groups, line} = queue.shift();
    if (analyzed[`${groups.join('-')}:${line}`]) {
      continue;
    } else {
      analyzed[`${groups.join('-')}:${line}`] = true;
    }
    if (!line) {
      queue.push({groups, line: '.'});
      queue.push({groups: groups.slice(1), line: ''.padStart(groups[0], '#')});
      continue;
    }

    if (line.split('').some((l, i) => pattern[i] !== l && pattern[i] !== '?')) {
      continue;
    }

    if (line.length > pattern.length) {
      continue;
    }
    if (line.length === pattern.length) {
      if (
        groups.length === 0 &&
        pattern.split('').every((p, i) => p === '?' || p === line[i])
      ) {
        solutions[line] = true;
      }
      continue;
    }
    if (
      pattern[line.length] === '.' ||
      pattern[line.length] === '?' ||
      !groups.length
    ) {
      queue.push({groups, line: line + '.'});
    }
    if (
      (pattern[line.length] === '?' || pattern[line.length] === '#') &&
      line[line.length - 1] !== '#' &&
      groups.length
    ) {
      queue.push({
        groups: groups.slice(1),
        line: line + ''.padStart(groups[0], '#'),
      });
    }
  }
  return Object.keys(solutions).length;
}

let memo = {};

function combinationsRecursive(pattern, groups) {
  const key = `${pattern}:${groups.join('-')}`;
  if (key in memo) {
    return memo[key];
  }
  if (pattern === '') {
    return groups.length === 0 ? 1 : 0;
  }
  if (groups.length === 0) {
    return pattern.includes('#') ? 0 : 1;
  }
  let variants = 0;
  if (pattern[0] === '.' || pattern[0] === '?') {
    variants += combinationsRecursive(pattern.slice(1), groups);
  }
  if (pattern[0] === '#' || pattern[0] === '?') {
    if (
      groups[0] <= pattern.length &&
      !pattern.slice(0, groups[0]).includes('.') &&
      pattern[groups[0]] !== '#'
    ) {
      variants += combinationsRecursive(
        pattern.slice(groups[0] + 1),
        groups.slice(1),
      );
    }
  }
  memo[key] = variants;
  return variants;
}

function sol1() {
  const {patterns, groups} = parse();
  const combinations = patterns.map((p, i) => {
    memo = {};
    return combinationsRecursive(p, groups[i]);
  });
  console.log(
    'Sol1:',
    combinations.reduce((a, b) => a + b, 0),
  );
}

//Too Slow: No response in time for input
function sol2() {
  const {patterns, groups} = parse();

  const combinations = patterns.map((p, i) => {
    memo = {};
    const augmentedPattern = new Array(5).fill(p).join('?');
    const augmentedGroup = new Array(5).fill(groups[i]).flat();
    memo = {};
    return combinationsRecursive(augmentedPattern, augmentedGroup);
  });
  console.log(
    'Sol2:',
    combinations.reduce((a, b) => a + b, 0),
  );
}
sol1();
sol2();
