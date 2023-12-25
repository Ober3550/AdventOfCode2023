const fs = require("fs");
let input = fs.readFileSync("test.txt", "utf-8");

// Matches words followed by colon and a table of numbers
var regex = /([a-zA-Z\- ]+) map:([0-9 \n]+)/g;

let matches;
let mappingTables = {};
while ((matches = regex.exec(input))) {
  let mappingName = matches[1].split("-to-");
  let table = matches[2]
    .split("\n")
    .filter((x) => x != "")
    .map((x) => {
      let triple = x.match(/[0-9]+/g).map((y) => {
        return Number.parseInt(y);
      });
      return {
        start: triple[1],
        end: triple[1] + triple[2],
        newStart: triple[0],
        newEnd: triple[0] + triple[2],
        delta: triple[0] - triple[1],
      };
    });
  let mapObject = {
    from: mappingName[0],
    to: mappingName[1],
    table: table,
  };
  mappingTables[mappingName[0]] = mapObject;
}

let seeds = input
  .match(/[0-9 ]+/)[0]
  .split(" ")
  .filter((x) => x != "")
  .map((x) => {
    return { seed: Number.parseInt(x) };
  });

let seedRanges = [];
for (let i = 0; i < seeds.length; i += 2) {
  let newSeed = {
    seed: [{ start: seeds[i].seed, end: seeds[i].seed + seeds[i + 1].seed }],
  };
  seedRanges.push(newSeed);
}

let mappings = Object.keys(mappingTables);
for (let i = 0; i < mappings.length; i++) {
  let source = mappings[i];
  let destination = mappingTables[source].to;
  let table = mappingTables[source].table;
  for (let j = 0; j < seeds.length; j++) {
    let seed = seeds[j];
    if (seed[source]) {
      let value = seed[source];
      let output = value;
      console.log(source, ":", seed[source]);
      for (let k = 0; k < table.length; k++) {
        if (value >= table[k].start && value < table[k].end) {
          console.log("delta:", table[k].delta);
          output += table[k].delta;
        }
      }
      seed[destination] = output;
    }
  }
}

console.dir(seedRanges, { depth: null });
// console.log(seeds);
