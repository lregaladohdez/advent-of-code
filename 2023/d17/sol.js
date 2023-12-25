const fs = require('fs');
const file = '2023/d17/input.txt';

function parse() {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((l) => l)
    .map((l) => l.split('').map(Number));
}

const directionHelper = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
};
const negateDirecionHelper = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

class PQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(item, priority) {
    this.queue.push({item, priority});
    this.queue.sort((a, b) => a.priority - b.priority);
  }
  dequeue() {
    return this.queue.shift().item;
  }

  isEmpty() {
    // console.log(this.queue.map((q) => q.item));
    return this.queue.length === 0;
  }
}

function sol1() {
  const map = parse();
  const queue = new PQueue();
  const visited = {};
  queue.enqueue({pos: [0, 0], dir: null, times: 0, heat: 0, steps: 0}, 0);
  while (true) {
    const {pos, dir, times, heat} = queue.dequeue();
    if (visited[`${pos[0]}-${pos[1]}:${dir}-${times}`]) {
      continue;
    }

    if (pos[0] === map.length - 1 && pos[1] === map[0].length - 1) {
      console.log(`Sol1: ${heat}`);
      break;
    }

    visited[`${pos[0]}-${pos[1]}:${dir}-${times}`] = true;

    Object.keys(directionHelper).forEach((newDir) => {
      if (
        newDir !== negateDirecionHelper[dir] &&
        (dir !== newDir || times < 3)
      ) {
        const newPos = [
          pos[0] + directionHelper[newDir][0],
          pos[1] + directionHelper[newDir][1],
        ];
        if (
          newPos[0] >= 0 &&
          newPos[0] < map.length &&
          newPos[1] >= 0 &&
          newPos[1] < map[0].length
        ) {
          queue.enqueue(
            {
              pos: newPos,
              dir: newDir,
              times: dir !== newDir ? 1 : times + 1,
              heat: heat + map[newPos[0]][newPos[1]],
            },
            heat + map[newPos[0]][newPos[1]],
          );
        }
      }
    });
  }
}

function sol2() {
  const map = parse();
  const queue = new PQueue();
  const visited = {};
  queue.enqueue({pos: [0, 0], dir: null, times: 0, heat: 0, steps: 0}, 0);
  while (!queue.isEmpty()) {
    const {pos, dir, times, heat} = queue.dequeue();

    if (visited[`${pos[0]}-${pos[1]}:${dir}-${times}`]) {
      continue;
    }

    if (
      pos[0] === map.length - 1 &&
      pos[1] === map[0].length - 1 &&
      times > 2
    ) {
      console.log(`Sol2: ${heat}`);
      break;
    }

    visited[`${pos[0]}-${pos[1]}:${dir}-${times}`] = true;
    // console.log('IN:', pos, dir, times, heat);
    Object.keys(directionHelper)
      .filter((newDir) => newDir !== negateDirecionHelper[dir])
      .forEach((newDir) => {
        if (
          !dir ||
          (newDir !== dir && times > 2) ||
          (newDir === dir && times < 9)
        ) {
          const newPos = [
            pos[0] + directionHelper[newDir][0],
            pos[1] + directionHelper[newDir][1],
          ];
          if (
            newPos[0] >= 0 &&
            newPos[0] < map.length &&
            newPos[1] >= 0 &&
            newPos[1] < map[0].length
          ) {
            // console.log(
            //   'Equeue:',
            //   newPos,
            //   newDir,
            //   times + 1,
            //   heat + map[newPos[0]][newPos[1]],
            // );
            queue.enqueue(
              {
                pos: newPos,
                dir: newDir,
                times: dir !== newDir ? 0 : times + 1,
                heat: heat + map[newPos[0]][newPos[1]],
              },
              heat + map[newPos[0]][newPos[1]],
            );
          }
        }
      });
  }
}

// sol1();
sol2();
