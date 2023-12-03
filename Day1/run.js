const fs = require("fs");

// Load the file input.txt
let data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });

// Part 2
if (true) {
  data = data.replace(/(one)/g, "$11$1");
  data = data.replace(/(two)/g, "$12$1");
  data = data.replace(/(three)/g, "$13$1");
  data = data.replace(/(four)/g, "$14$1");
  data = data.replace(/(five)/g, "$15$1");
  data = data.replace(/(six)/g, "$16$1");
  data = data.replace(/(seven)/g, "$17$1");
  data = data.replace(/(eight)/g, "$18$1");
  data = data.replace(/(nine)/g, "$19$1");
}

// Remove all but the numbers
data = data.replace(/[a-z]/g, "");
data = data.split("\n");

// Iterate over each line and grab the first and last digit to create a 2 digit number
let numbers = [];
for (let i = 0; i < data.length - 1; i++) {
  let string = data[i];
  let first = string[0];
  let last = string.slice(-1);
  numbers.push(Number.parseInt(first + last));
}
console.log(
  "Part 2:",
  numbers.reduce((a, b) => a + b, 0)
);
