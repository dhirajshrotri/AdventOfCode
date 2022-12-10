const fs = require('fs');
const readline = require('readline');

const getNeighbours = function(input, x, y) {
    return [
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
        [x - 1, y]
    ].filter(([x, y]) => y in input && x in input[y])
}

const parseInput1 = async function() {
    const filestream = fs.createReadStream(`./input1.txt`)
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    let input = [];
    let visited = [];
    let lowest = [];

    for await (const line of rl) {
        let temp = line.split('').map(el => parseInt(el));
        input.push(temp);
    }
    console.log(input)
    for(let i = 0; i < input.length; i++) {
        let temp = [];
        for(let j = 0; j < input[i].length; j++) {
            temp.push(false);
        }
        visited.push(temp);
    }

    let dfs = function(i, j) {

        let stack = [];
        stack.push([i, j]);

        while(stack.length) {
            [i, j] = stack.pop();
            if(!visited[i][j]) {
                visited[i][j] = true;
            }
            let adj = getNeighbours(input, i, j);
            if(input[i][j] === Math.min(input[i][j], ...adj.map(([x, y]) => input[x][y]))) {
                lowest.push(input[i][j])
            }
            for(let a of adj) {
                if (!visited[a[0]][a[1]]) {
                    stack.push(a);
                }
            }
        }
    }

    dfs(0, 0);

    console.log(lowest.reduce((a, acc) => a + acc, 0));
}

parseInput1();
