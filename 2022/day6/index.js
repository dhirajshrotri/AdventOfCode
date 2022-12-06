const fs = require('fs');
const readline = require('readline');

async function processLinesPartOne() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });
    let input = '';
    for await (const line of rl) {
        input = line;
    }
    let part1 = 4;
    let part2 = 14;
    for (let i = 0; i < input.length; i++) {
        const slice = input.slice(i, i + part1);
        let set = new Set(slice.split(""));
        if ( set.size === part1) {
            console.log(i + part1);
            break;
        }
    }
}


processLinesPartOne();
