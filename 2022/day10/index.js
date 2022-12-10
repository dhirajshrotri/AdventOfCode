const fs = require('fs');
const readline = require('readline');

const part1 = async function() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });
    const cycles = [20, 60, 100, 140, 180, 220];
    let cycleNumber = 0;
    let xRegister = 1;
    let instructions = [];
    let total = 0;
    let prev = null;
    let currentInstructionCycle = 0;
    for await (const line of rl) {
        instructions.push(line.split(' '));
    }

    while(instructions.length) {
        cycleNumber++;
        if(cycles.includes(cycleNumber)) {
            total += xRegister * cycleNumber;
        }
        if(currentInstructionCycle === 0) {
            prev = instructions.shift();

        }
        if(prev[0] === 'noop') {
            currentInstructionCycle = 0;
            continue;
        }
        if (prev[0] === 'addx' && currentInstructionCycle != 1) {
            currentInstructionCycle++;
        }
        else if (prev[0] === 'addx' && currentInstructionCycle === 1) {
            xRegister += parseInt(prev[1]);
            currentInstructionCycle = 0;
        }


    }

    console.log(total);

}

const part2 = async function() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    let cycle = 1;
    let value = 1;

    let pixels = '';

    const drawCyclePixel = () => {
        const drawColumn = (cycle - 1) % 40;
        pixels += Math.abs(drawColumn - value) <= 1 ? '#' : ' ';
    }

    drawCyclePixel();
    for await (const line of rl) {
        const parts = line.split(' ');
        if (parts[0] === 'addx') {
            ++cycle; // addx takes 2 cycle
            drawCyclePixel();
            value += parseInt(parts[1]);
        }
        ++cycle;
        drawCyclePixel();
    }

// Draw the CRT screen
    for (let i = 0; i < 6; ++i) {
        console.log(pixels.substring(i * 40, (i + 1) * 40));
    }
}
// part1();

const par2 = async function () {
    let i = await part2();
    console.log(i);
}

par2();
