const fs = require('fs');
const file = '2023/d9/input.txt';

function parse() {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((l) => l)
    .map((l) => l.match(/-?\d+/g).map(Number));
}

function predictNextValue(sensorHistory) {
  if (sensorHistory.length < 2) {
    return 0;
  }
  const diff = new Array(sensorHistory.length - 1).fill(0);
  diff.forEach((_, i) => {
    diff[i] = sensorHistory[i + 1] - sensorHistory[i];
  });
  if (diff.every((d) => d === 0)) {
    return sensorHistory[sensorHistory.length - 1];
  }
  const nextLevelPrediction = predictNextValue(diff);
  return sensorHistory[sensorHistory.length - 1] + nextLevelPrediction;
}

function predictPreviousValue(sensorHistory) {
  if (sensorHistory.length < 2) {
    return 0;
  }
  const diff = new Array(sensorHistory.length - 1).fill(0);
  diff.forEach((_, i) => {
    diff[i] = sensorHistory[i + 1] - sensorHistory[i];
  });
  if (diff.every((d) => d === 0)) {
    return sensorHistory[0];
  }
  const nextLevelPrediction = predictPreviousValue(diff);
  return sensorHistory[0] - nextLevelPrediction;
}

function sol1() {
  const sensorsData = parse();

  const predictions = sensorsData.map((sensorHistory) =>
    predictNextValue(sensorHistory),
  );
  console.log(`Sol1: ${predictions.reduce((a, b) => a + b, 0)}`);
}

function sol2() {
  const sensorsData = parse();

  const predictions = sensorsData.map((sensorHistory) =>
    predictPreviousValue(sensorHistory),
  );
  console.log(`Sol2: ${predictions.reduce((a, b) => a + b, 0)}`);
}

sol1();
sol2();
