/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map(); // [ [word, next], [word, next], [word, next] ]

    for (let i = 0; i < this.words.length; i += 1) {
      // loops over words. Incriments i
      let word = this.words[i]; // each word in words
      let nextWord = this.words[i + 1] || null; // next word in map

      if (chains.has(word)) chains.get(word).push(nextWord);
      // if chains has word, get the word and push it to the nextWord arr
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
    // return random option from arr
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    // creates copy of arr
    let key = MarkovMachine.choice(keys);
    // random key from keys arr
    let out = [];

    while (out.length < numWords && key !== null) {
      // while out is less than 100 & key isn't null
      // push key into out arr
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
      // get random key
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
