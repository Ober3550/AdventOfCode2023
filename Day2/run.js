const fs = require("fs");
let data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" }).split("\n");
const maxCubes = {
  r: 12,
  g: 13,
  b: 14,
};

let games = [];
for (let i = 0; i < data.length - 1; i++) {
  // We can make assumptions about the games (information that's not valid to process)
  // We don't need the game id since that's just the line number
  // We don't need the turn separation because we're only checking if a turn goes outside the bounds of our constraint
  // So per line we only need the number of cubes and the color
  // We don't even need the full name of the color since rgb are all distinct
  let picks = data[i].match(/[0-9]+ [rgb]/g);
  let game = {
    id: i + 1,
    valid: true,
    power: 0,
    maxes: {
      r: 0,
      g: 0,
      b: 0,
    },
  };
  for (let j = 0; j < picks.length; j++) {
    // Make sure to eval the count as a number not a string
    let turn = picks[j].split(" ");
    turn[0] = Number.parseInt(turn[0]);
    if (turn[0] > game.maxes[turn[1]]) {
      game.maxes[turn[1]] = turn[0];
    }
    // If a turn has more cubes than the max for a bag that bag is invalid
    // We can break early in this case
    if (turn[0] > maxCubes[turn[1]]) {
      game.valid = false;
    }
  }
  game.power = game.maxes.r * game.maxes.g * game.maxes.b;
  games.push(game);
}

// Part 1
console.log(
  "Part 1:",
  games
    .filter((x) => {
      return x.valid;
    })
    .map((x) => x.id)
    .reduce((a, b) => a + b, 0)
);

// Part 2
console.log(
  "Part 2:",
  games.map((x) => x.power).reduce((a, b) => a + b, 0)
);
