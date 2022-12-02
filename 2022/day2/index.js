const fs = require('fs');
const readline = require('readline');



const findMaxScore1 = function(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            const mapping = {
                "Y" : 2, //paper
                "X": 1,  //rock
                "Z": 3,  //scissors
            }

            const draw = {
                "X": "A",
                "Y": "B",
                "Z": "C"
            }

            const winScenarios = {
                "Y": "A",
                "X": "C",
                "Z": "B"
            }
            let totalScore = 0;
            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false
            });

            for await (const line of rl ) {
                let input = line.split(' ');
                if(winScenarios[input[1]] === input[0]) {
                    totalScore += mapping[input[1]] + 6; //win
                }
                else {
                    if(draw[input[1]] === input[0]) {
                        totalScore += mapping[input[1]] + 3; //draw
                    }
                    else {
                        totalScore += mapping[input[1]];
                    }
                }
            }

            resolve(totalScore);
        }
        catch (err) {
            reject(err);
        }
    })
}

const findMaxScore2 = function(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            const mapping = {
                "B" : 2, //paper
                "A": 1,  //rock
                "C": 3,  //scissors
            }
            const winMapping = {
                "A": "C",
                "B": "A",
                "C": "B"
            }
            const loseMapping = {
                "A": "B",
                "B": "C",
                "C": "A"
            }

            let totalScore = 0;
            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false
            });

            for await (const line of rl ) {
                let input = line.split(' ');
                if(input[1] === 'Y') {
                    totalScore += mapping[input[0]] + 3;
                }
                else if(input[1] === 'X') {
                    totalScore += mapping[winMapping[input[0]]];
                }
                else {
                    totalScore += mapping[loseMapping[input[0]]] + 6;
                }
            }

            resolve(totalScore);
        }
        catch (err) {
            reject(err);
        }
    })
}

const main = async () => {
    let score = await findMaxScore1('./input2.txt');
    let score2 = await findMaxScore2('./input2.txt')
    console.log(score);
    console.log(score2);
}

main();
