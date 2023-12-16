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

let memo = {};

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
  //   console.log(pattern, groups, Object.keys(solutions));
  return Object.keys(solutions).length;
}

function sol1() {
  const {patterns, groups} = parse();
  //   console.log(patterns, groups);

  const combinations = patterns.map((p, i) => {
    memo = {};
    return combinationsInPattern(p, groups[i]);
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
    console.log(augmentedPattern, augmentedGroup);
    return combinationsInPattern(augmentedPattern, augmentedGroup);
  });
  //   console.log(combinations, memo);
  console.log(
    'Sol1:',
    combinations.reduce((a, b) => a + b, 0),
  );
}

sol1();
