// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
         score += Number(pointValue);
		 }
 
	  }
	}
	return score + '\n' + letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   console.log("Let's play some Scrabble!" + "\n");
   return input.question("Enter a word to score: ");
};

let newPointStructure;

let simpleScorer = (word) => word.length;

let vowelBonusScorer = (word) => {
   let score = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];

   for(let i = 0; i < word.length; i++){
      if(vowels.includes(word.toUpperCase()[i])){
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scoringFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scoringFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: oldScrabbleScorer
   }
];

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?' + '\n');
   for(let i = 0; i < scoringAlgorithms.length; i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let userChoice = input.question('Enter 0, 1, or 2: ');

   return scoringAlgorithms[userChoice];
}

function transform() {};

function runProgram() {
   let word = initialPrompt();
   // console.log(oldScrabbleScorer(word));
   // console.log(simpleScorer(word));
   // console.log(vowelBonusScorer(word));
   let algorithmChoice = scorerPrompt();
   console.log(`Score for '${word}': ${algorithmChoice.scoringFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
