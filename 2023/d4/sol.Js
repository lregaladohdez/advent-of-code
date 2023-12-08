const fs = require('fs');

function parse() {
  const data = fs.readFileSync('2023/d4/input.txt', 'utf8');
  const lines = data.split('\n');
  const cards = lines
    .map((line) =>
      line
        .split(':')[1]
        .split('|')
        .map((part) => part.match(/(\d+)/g)),
    )
    .map((l) => ({
      cardNums: l[0],
      winNums: l[1],
    }));

  return cards;
}

function CardValue(card) {
  const cardHash = {};
  card.cardNums.forEach((num) => (cardHash[num] = true));
  let cardValue = 0;
  card.winNums.forEach((num) => {
    if (cardHash[num]) {
      cardValue++;
    }
  });
  return !cardValue ? 0 : 2 ** (cardValue - 1);
}

function CardValue2(card) {
  const cardHash = {};
  card.cardNums.forEach((num) => (cardHash[num] = true));
  let cardValue = 0;
  card.winNums.forEach((num) => {
    if (cardHash[num]) {
      cardValue++;
    }
  });
  return cardValue;
}

function sol1() {
  const cards = parse();
  const cardsTotalValue = cards.reduce((acc, card) => acc + CardValue(card), 0);
  console.log(`Sol1:`, cardsTotalValue);
}

function sol2() {
  const cards = parse();
  const scratchs = new Array(cards.length).fill(1);
  cards.forEach((card, i) => {
    const matches = CardValue2(card);
    for (let j = 0; j < matches && i + j + 1 < scratchs.length; j++) {
      scratchs[i + j + 1] += scratchs[i];
    }
  });
  console.log(
    'Sol2:',
    scratchs.reduce((acc, copies) => acc + copies, 0),
  );
}

sol1();
sol2();
