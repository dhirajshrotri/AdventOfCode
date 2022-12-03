const fs = require('fs');
const readline = require('readline');

const readInput = async function() {
    const filestream = fs.createReadStream(`./input2.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });
    let octopuses = [];
    for await (const line of rl) {
        const li = line.split('').map(el => parseInt(el));
        octopuses.push(li);
    }


    return octopuses;
};

function getAdjacent(map, x, y) {
    return [
        [x,     y - 1],
        [x,     y + 1],
        [x - 1,     y],
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1],
        [x + 1,     y],
        [x + 1, y + 1],
    ].filter(([x, y]) => y in map && x in map[y]);
}

function checkFlashes(map, x, y) {
    if (map[y][x] !== 10) {
        return 0;
    }

    let count = 1;

    for (const [xx, yy] of getAdjacent(map, x, y)) {
        if (map[yy][xx] <= 9) {
            map[yy][xx]++;
            count += checkFlashes(map, xx, yy);
        }
    }

    map[y][x] = 11; // handled

    return count;
}

const traverse = function(map, callback) {
    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            callback(x, y);
        }
    }
}

const processPartOne = async function() {
    let octopuses = await readInput();

    for(let step = 1;; step++) {
        let flashes = 0;

        traverse(octopuses, (x, y) => octopuses[y][x]++);
        traverse(octopuses, (x, y) => { flashes += checkFlashes(octopuses, x, y); });
        traverse(octopuses, (x, y) => { octopuses[y][x] > 9 ? octopuses[y][x] = 0 : null; });

        if (flashes === octopuses.length * octopuses[0].length) {
            console.log('all flushed on step:', step);
            break;
        }

    }
}

processPartOne();



