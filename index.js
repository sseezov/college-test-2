#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');

// BEGIN

// Step 1
const rows = content.split('\r\n');
const data = rows.slice(1);

const creatures = data.map((creature) => creature.split('|')[1]);
console.log(`Количество видов существ: ${creatures.length}`);

// Data Normalization
const collection = data.map((row) => row.split('|'));
const normalizedData = collection.map((item) =>
  item.filter((elem) => elem).map((elem) => elem.trim())
);

// Step 2
const strengthOrder = _.sortBy(normalizedData, (creature) =>
  Number(creature[1])
);
const strongestUnit = strengthOrder[strengthOrder.length - 1];
const secondStrongestUnit = strengthOrder[strengthOrder.length - 2];
const tenStrongest = strongestUnit[6] * 10;
const twentySecondStrongest = secondStrongestUnit[6] * 20;

console.log(`Стоимость найма 10 самых сильных существ: ${tenStrongest}
Стоимость найма 20 вторых по силе существ: ${twentySecondStrongest}`);

// Step 3
const maxWeightCreature = _.maxBy(normalizedData, (creature) =>
  Number(creature[5])
);

const minWeightCreature = _.minBy(normalizedData, (creature) =>
  Number(creature[5])
);

const priceSquad = Number(maxWeightCreature[6]) + Number(minWeightCreature[6]);

console.log(`Стоимость отряда самых толстых и худых: ${priceSquad}`);

// Step 4
const strengthAndPrice = _.sortBy(normalizedData, (creature) => {
  return Number(creature[1]) / Number(creature[6]);
});

const mostProfitableUnit = strengthAndPrice[strengthAndPrice.length - 1];
const leastProfitableUnit = strengthAndPrice[0];

console.log(`Самый выгодный юнит по соотношению цены и силы: ${mostProfitableUnit[0]}
Самый невыгодный юнит по соотношению цены и силы: ${leastProfitableUnit[0]}`);

// Step 5
const money = 10000;
const strongestOrder = _.sortBy(
  normalizedData,
  (creature) => (money / Number(creature[6])) * creature[1]
);

const strongestArmy = strongestOrder[strongestOrder.length - 1];
const unitsCount = money / strongestArmy[6];
console.log(
  `Самый сильная армия за 10000: ${unitsCount} ${strongestArmy[0]}ов`
);
// END
