const fs = require("fs");

// Load the file input.txt
let data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });

// Remove all but the numbers
data = data.replace(/[a-z]/g, "");
data = data.split("\n");

// Iterate over each line and grab the first and last digit to create a 2 digit number
// Sum those numbers for your answer
let sum = 0;
for (let i = 0; i < data.length - 1; i++) {
  let string = data[i];
  let first = string[0];
  let last = string.slice(-1);
  sum += Number.parseInt(first + last);
}
console.log(sum);
