const fs = require("fs");
let data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" }).split("\n");

let parts = [];
for (let i = 0; i < data.length - 1; i++) {
  let re = /[0-9]+/g;
  while ((match = re.exec(data[i])) != null) {
    let number = {
      value: Number.parseInt(match[0]),
      y: i,
      x: match.index,
    };
    parts.push(number);
  }
}

let symbols = [];
for (let i = 0; i < data.length - 1; i++) {
  let re = /[^0-9\.]/g;
  while ((match = re.exec(data[i])) != null) {
    let symbol = {
      type: match[0],
      y: i,
      x: match.index,
      valid: false,
    };
    symbols.push(symbol);
  }
}

let gearRatio = 0;
for (let i = 0; i < symbols.length; i++) {
  let validParts = parts.filter((part) => {
    return (
      part.y <= symbols[i].y + 1 &&
      part.y >= symbols[i].y - 1 &&
      part.x >= symbols[i].x - part.value.toString().length &&
      part.x <= symbols[i].x + 1
    );
  });
  for (let j = 0; j < validParts.length; j++) {
    validParts[j].valid = true;
  }
  if (symbols[i].type == "*" && validParts.length == 2) {
    gearRatio += validParts[0].value * validParts[1].value;
  }
}

console.log(
  "Part 1:",
  parts
    .filter((part) => part.valid)
    .map((part) => part.value)
    .reduce((a, b) => a + b, 0)
);
console.log("Part 2:", gearRatio);
