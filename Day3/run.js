const fs = require("fs");
let data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" }).split("\n");

numbers = [];
for (let i = 0; i < data.length - 1; i++) {
  let re = /[0-9]+/g;
  while ((match = re.exec(data[i])) != null) {
    let number = {
      value: Number.parseInt(match[0]),
      y: i,
      x: match.index,
      symbols: [],
    };
    for (let y = -1; y < 2; y++) {
      let check = "";
      for (let x = -1; x < match[0].length + 1; x++) {
        if (
          number.y + y >= 0 &&
          number.y + y < data.length &&
          number.x + x >= 0 &&
          number.x + x < data[number.y + y].length
        ) {
          check += data[number.y + y][number.x + x];
        }
      }
      let matchSymbols = check.match(/[^0-9\.]/g);
      if (matchSymbols) {
        for (let s = 0; s < matchSymbols.length; s++) {
          number.symbols.push(matchSymbols[s]);
        }
      }
    }
    numbers.push(number);
  }
}

let validParts = numbers.filter((x) => {
  return x.symbols.length > 0;
});

console.log(
  "Part 1:",
  validParts.map((x) => x.value).reduce((a, b) => a + b, 0)
);

let symbols = [];
for (let i = 0; i < data.length - 1; i++) {
  let re = /[^0-9\.]/g;
  while ((match = re.exec(data[i])) != null) {
    let symbol = {
      type: match[0],
      y: i,
      x: match.index,
    };
    symbols.push(symbol);
  }
}

let gears = symbols.filter((x) => x.type == "*");
let gearParts = numbers.filter((x) => {
  return x.symbols.includes("*");
});

let sum = 0;
for (let i = 0; i < gears.length; i++) {
  let parts = gearParts.filter((part) => {
    return (
      part.y <= gears[i].y + 1 &&
      part.y >= gears[i].y - 1 &&
      part.x >= gears[i].x - part.value.toString().length &&
      part.x <= gears[i].x + 1
    );
  });
  if (parts.length == 2) {
    sum += parts[0].value * parts[1].value;
  }
}

console.log("Part 2:", sum);
