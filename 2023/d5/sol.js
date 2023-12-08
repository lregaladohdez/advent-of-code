const fs = require('fs');
const {inspect} = require('util');
const file = '20203/d5/input.txt';

function parse() {
  const data = fs.readFileSync(file, 'utf8').split('\n');

  const seeds = data[0].match(/\d+/g).map(Number);
  const maps = [];
  let currentLine = 1;
  while (++currentLine < data.length) {
    const map = {
      from: data[currentLine].split('-to-')[0],
      to: data[currentLine].split('-to-')[1].split(' ')[0],
      transforms: [],
    };
    while (data[++currentLine]) {
      const [o, i, l] = data[currentLine].match(/\d+/g).map(Number);
      map.transforms.push({o, i, l});
    }
    map.transforms.sort((a, b) => a.i - b.i);
    maps.push(map);
  }
  return [seeds, maps];
}
function traverseMap(x, map) {
  const transform = map.transforms.find((t) => x >= t.i && x < t.i + t.l);
  if (transform) {
    // console.log(transform)

    return x - transform.i + transform.o;
  }
  return x;
}

function sol1() {
  const [seeds, maps] = parse();
  const mappedSeeds = seeds.map((seed) => {
    maps.forEach((map) => {
      seed = traverseMap(seed, map);
    });
    return seed;
  });
  console.log(`Result:`, Math.min(...mappedSeeds));
}

function sol2() {
  const [seedsRanges, maps] = parse();
  const seeds = [];
  for (let i = 0; i < seedsRanges.length; i += 2) {
    seeds.push({
      start: seedsRanges[i],
      end: seedsRanges[i] + seedsRanges[i + 1],
    });
  }
  console.log(seeds);
  let selectedSeed = 0;
  let minLocation = Number.MAX_SAFE_INTEGER;
  seeds.forEach((seed) => {
    console.log(`Seed ${seed.start}-${seed.end}`);
    for (let i = seed.start; i < seed.end; i++) {
      let transforSeed = i;
      maps.forEach((map) => {
        const cp = transforSeed;
        transforSeed = traverseMap(transforSeed, map);
        // console.log(`Seed ${cp} -> ${map.from}:${map.to} -> ${transforSeed}`)
      });

      if (transforSeed < minLocation) {
        minLocation = transforSeed;
        selectedSeed = i;
      }
      // console.log(`----------> Seed ${i} -> loc: ${transforSeed}`)
    }
  });
  console.log(`Result:`, minLocation);
}

sol2();
