const fs = require('fs');
const readline = require('readline');


async function processLinesPartOne() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    })

    let overlap = 0;
    for await (const line of rl) {
        const [[p1, p2], [q1, q2]]  = line
            .split(',')
            .map((el) => el.split('-').map(Number));
        if ((p1 <= q1 && p2 >= q2) || (p1 >= q1 && p2 <= q2)) {
            overlap++;
        }
    }

    console.log('>>>>> Part 1: ', overlap);
}


async function processLinesPartTwo() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    })
    let overlap = 0;
    for await (const line of rl) {
        const [[p1, p2], [q1, q2]] = line
            .split(',')
            .map((el) => el.split('-').map(Number));
        if ((p1 >= q1 && p1 <= q2) || (q1 >= p1 && q1 <= p2)) {
            overlap++;
        }
    }

    console.log('>>>>> Part 2: ', overlap);
}

processLinesPartOne();
processLinesPartTwo();
