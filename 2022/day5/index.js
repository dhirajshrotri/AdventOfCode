const fs = require('fs');
const readline = require('readline');


async function processLinesPartOne() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    let stacks = ['DTRBJLWG', 'SWC', 'RZTM', 'DTCHSPV', 'GPTLDZ', 'FBRZJQCD', 'SBDJMFTR', 'LHRBTVM', 'QPDSV'].map(el => el.split(''));
    let instructions = [];
    let forbidden = ['move', 'from', 'to'];
    for await (const line of rl) {
        let temp = line.split(' ').filter(el => !forbidden.includes(el)).map(el => parseInt(el))
        instructions.push(temp);
    }

    for(let [a, b, c] of instructions) {
        for(let j = 0; j < a; j++) {
            stacks[c - 1].push(stacks[b - 1].pop())
        }
    }
    console.log('>>>>> Part 1: ');
    console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}


async function processLinesPartTwo() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    })

    let stacks = ['DTRBJLWG', 'SWC', 'RZTM', 'DTCHSPV', 'GPTLDZ', 'FBRZJQCD', 'SBDJMFTR', 'LHRBTVM', 'QPDSV'].map(el => el.split(''));
    let instructions = [];
    let forbidden = ['move', 'from', 'to'];
    for await (const line of rl) {
        let temp = line.split(' ').filter(el => !forbidden.includes(el)).map(el => parseInt(el))
        instructions.push(temp);
    }
    for(let [a, b, c] of instructions) {
        stacks[c - 1].push(...stacks[b - 1].slice(-a));
        stacks[b - 1].length -= a;
    }
    console.log('>>>>> Part 2: ');
    console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));

}

processLinesPartOne();
processLinesPartTwo();
