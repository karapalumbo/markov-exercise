/** Command-line tool to generate Markov text. */
const fs = require("fs");
const process = require("process");
const axios = require("axios");
const markov = require("./markov");

function generateText(text) {
  let t = new markov.MarkovMachine(text);
  console.log(t.makeText());
}

function makeText(path) {
  // txt file
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

let res;
async function makeURLText(url) {
  // url
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(res.data);
}

let [method, path] = process.argv.slice(2);
// 1st arg = path to node
// 2nd arg = path to current file

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  console.log(`Unknown method: ${method}`);
  process.exit(1);
}
