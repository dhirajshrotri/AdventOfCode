const fs = require('fs');
const readline = require('readline');



const findMaxScore2 = function(filename) {
    return new Promise(async (resolve, reject) => {
        try {

            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false
            });
            let sum = [];
            let sack = [];
            for await (const line of rl ) {
                if(sack.length !== 3) {
                    sack.push(line.split(''));
                }
                if(sack.length === 3) {

                    const found = sack[0].filter(x => sack[1].filter(el => sack[2].includes(el)).includes(x)).join();

                    if(found === found.toUpperCase()) {
                        sum.push(26 + found.charCodeAt(0) - 64);
                    }
                    else {
                        sum.push(found.charCodeAt(0) - 96);
                    }
                    sack = [];
                }

            }
            let final = sum.reduce((a, acc) => acc + a, 0);

            resolve(final);
        }
        catch (err) {
            reject(err);
        }
    })
}

const findMaxScore1 = function(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            let sum = [];
            let dict = {};
            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false
            });

            for await (const line of rl ) {
                let input = line.split('');
                const half = Math.ceil(input.length / 2);

                const firstHalf = Array.from(new Set(input.slice(0, half)));
                const secondHalf = Array.from(new Set(input.slice(half)));

                const found = firstHalf.filter(x => secondHalf.includes(x)).join();

                if(found === found.toUpperCase()) {
                    sum.push(26 + found.charCodeAt(0) - 64);
                }
                else {
                    sum.push(found.charCodeAt(0) - 96);
                }
            }
            let final = sum.reduce((a, acc) => acc + a, 0);

            resolve(final);
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
