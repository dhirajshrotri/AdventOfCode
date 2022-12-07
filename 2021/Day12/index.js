const fs = require('fs');

const isSmallLetter = function(s) {
    return s.toLowerCase() === s;
}

const findPaths = function(map, start, end, paths = [], currPath = {}) {
    currPath[start] = currPath[start] + 1 || 1;

    if(isSmallLetter(start) && currPath[start] === 2) {
        currPath['small cave visited twice'] = true;
    }

    if (start === end) {
        paths.push(currPath);
        return;
    }

    if (!map[start]) {
        return;
    }

    for (const x of map[start]) {
        if (isSmallLetter(x) && x in currPath) {
            // continue; // Part 1

            if (['start', 'end'].includes(x) || currPath['small cave visited twice']) {
                continue;
            }
        }

        findPaths(map, x, end, paths, {...currPath});
    }

    return paths;
}

const processInput = async function() {
    const map = {};

    fs.readFileSync('./input2.txt')
        .toString()
        .split('\n')
        .map(line => {
            const [x, y] = line.split('-');
            map[x] ? map[x].push(y) : map[x] = [y];
            map[y] ? map[y].push(x) : map[y] = [x];
        });

    const paths = findPaths(map, 'start', 'end');
    console.log('>>>> part 1 ', paths.length);
}

processInput();
