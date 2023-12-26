const fs = require('fs');
const file = '2023/d19/input.txt';

function parse() {
  const [rulesData, ratingsData] = fs.readFileSync(file, 'utf8').split('\n\n');
  const rules = rulesData.split('\n').reduce(
    (rules, r) => ({
      ...rules,
      [r.match(/(\w+){/)[1]]: {
        conditions: r.match(/\w+.?\d+:\w+/g).map((c) => ({
          symbol: c.match(/(\w+).?\d+/)[1],
          operator: c.match(/\w+(.?)\d+/)[1],
          value: Number(c.match(/\w+.?(\d+)/)[1]),
          pass: c.split(':')[1],
        })),
        default: r.split(',').pop().split('}')[0],
      },
    }),
    {},
  );
  const ratings = ratingsData.split('\n').map((r) => {
    const groups = r.match(/(\w+=\d+)/g);
    return groups.reduce(
      (rat, g) => ({...rat, [g.split('=')[0]]: Number(g.split('=')[1])}),
      {},
    );
  });
  return {rules, ratings};
}

function sol1() {
  const {rules, ratings} = parse();
  const passingRatings = ratings.filter((rating) => {
    let rule = rules.in;
    while (true) {
      const newRule =
        rule.conditions.find(
          (c) =>
            (c.operator === '>' && rating[c.symbol] > c.value) ||
            (c.operator === '<' && rating[c.symbol] < c.value),
        )?.pass || rule.default;
      if (newRule === 'A') {
        return true;
      }
      if (newRule === 'R') {
        return false;
      }
      rule = rules[newRule];
    }
  });
  console.log(
    `Sol1: ${passingRatings
      .map((r) => Object.values(r))
      .flat()
      .reduce((a, b) => a + b, 0)}`,
  );
}

function countVariants(ruleName, intervals, rules) {
  if (Object.values(intervals).some((v) => v[0] >= v[1])) {
    return 0;
  }
  if (ruleName === 'R') {
    return 0;
  }
  if (ruleName === 'A') {
    return Object.values(intervals)
      .map((v) => v[1] - v[0] + 1)
      .reduce((a, b) => a * b, 1);
  }
  let combinations = 0;
  let i = 0;
  for (i = 0; i < rules[ruleName].conditions.length; i++) {
    const c = rules[ruleName].conditions[i];
    if (c.operator === '<') {
      const usedInterval = [
        intervals[c.symbol][0],
        Math.min(c.value - 1, intervals[c.symbol][1]),
      ];
      intervals[c.symbol] = [usedInterval[1] + 1, intervals[c.symbol][1]];
      combinations += countVariants(
        c.pass,
        JSON.parse(
          JSON.stringify({...intervals, [c.symbol]: [...usedInterval]}),
        ),
        rules,
      );
    } else {
      const usedInterval = [
        Math.max(c.value + 1, intervals[c.symbol][0]),
        intervals[c.symbol][1],
      ];
      intervals[c.symbol] = [intervals[c.symbol][0], usedInterval[0] - 1];
      combinations += countVariants(
        c.pass,
        JSON.parse(JSON.stringify({...intervals, [c.symbol]: usedInterval})),
        rules,
      );
    }
  }
  rules[ruleName].conditions.forEach((c) => {});
  combinations += countVariants(
    rules[ruleName].default,
    JSON.parse(JSON.stringify(intervals)),
    rules,
  );
  return combinations;
}

function sol2() {
  const {rules} = parse();

  const variantsTotal = countVariants(
    'in',
    {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]},
    rules,
  );
  console.log(`Sol2: ${variantsTotal}`);
}

sol1();
sol2();
