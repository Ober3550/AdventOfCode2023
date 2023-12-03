const fs = require("fs");
let data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" }).split("\n");
const maxCubes = {
  r: 12,
  g: 13,
  b: 14,
};

let validGames = [];
for (let i = 0; i < data.length - 1; i++) {
  // We can make assumptions about the games (information that's not valid to process)
  // We don't need the game id since that's just the line number
  // We don't need the turn separation because we're only checking if a turn goes outside the bounds of our constraint
  // So per line we only need the number of cubes and the color
  // We don't even need the full name of the color since rgb are all distinct
  let picks = data[i].match(/[0-9]+ [rgb]/g);
  let valid = true;
  for (let j = 0; j < picks.length; j++) {
    let turn = picks[j].split(" ");
    // If a turn has more cubes than the max for a bag that bag is invalid
    // We can break early in this case
    if (turn[0] > maxCubes[turn[1]]) {
      valid = false;
      break;
    }
  }
  if (valid) {
    validGames.push(i + 1);
  }
}

// We could just sum the ids while processing each line
// but doing this allows us to check which games the
// algorithm determined were valid so we can manually check them
console.log(validGames.reduce((a, b) => a + b, 0));
