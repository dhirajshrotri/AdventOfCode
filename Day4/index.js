const fs = require('fs');
const readline = require('readline');

const readInput =  function(filename) {
   return new Promise(async (resolve, reject) => {
    try {
        const rl = readline.createInterface({
            input : fs.createReadStream(filename),
            output : process.stdout,
            terminal: false
        });
        let inputNumbers = [];
        let boards = [];
        let temp = [];
        for await (const line of rl) {
            if(!inputNumbers.length) {
                inputNumbers = line.split(',').map(el => parseInt(el));
            }
            else {
                if(line.length > 0) {
                    temp.push(line.split(' ')
                        .filter(el => el.length > 0)
                        .map(el => parseInt(el)));
                }
                else if(temp.length > 0){
                    boards.push(temp);
                    temp = [];
                }
            }
        }
        boards.push(temp);
        resolve({
            inputNumbers,
            boards
        })
    }
    catch(err) { 
        reject(err) 
    }
   })
    
}

const main = async function() {
    const output = await readInput('input1.txt');
    const inputNumbers = output['inputNumbers'];
    const boards = output['boards'];
    const susBoards = Array(boards.length).fill(0);
    //part 1
    // for (const num of inputNumbers) {
    //     for(const i of boards) {
    //         for(let j of i) {
    //             if (!j.includes(num)) {
    //                 continue;
    //             }
    //             const index = j.indexOf(num);
    //             j[index] = -1;
    //             if(checkBoard(i)) {
    //                 return calculateWin(i, num);
    //             }
    //         }
    //     }
    // }
    //part 2
    let boardsCompleted = [];
    let winningNums = [];
    for(const num of inputNumbers) {
        for(let i = 0; i < boards.length; i++) {
            if(boardsCompleted.includes(i)) {
                continue;
            }
            for(const j of boards[i]) {
                if (!j.includes(num)) {
                        continue;
                }
                const index = j.indexOf(num);
                j[index] = -1;
                if(checkBoard(boards[i])) {
                    boardsCompleted.push(i);
                    winningNums.push(num);
                }
            }
        }
    }

    let lastBoardIndex = boardsCompleted[boardsCompleted.length - 1]
    return calculateWin(boards[lastBoardIndex], winningNums[winningNums.length - 1])

    //return -10000;
}
/*
    [[1, 2, 3, 4, 5],
     [-1, -1, ],
     [],
     [],
     []]
*/
const checkBoard = function(board) {
    let rowSum = 0;
    //for rows
    for(const row of board) {
        rowSum = row.reduce((a, b) => a + b, 0);
        if(rowSum === -5) {
            return true;
        }
    }

    //check cols
    for(let i = 0; i < 5; i++) {
        let sum = 0;
        for(let j = 0; j < 5; j++) {
            sum += board[j][i];
        }
        if(sum === -5) {
            return true;
        }
    }

    return false;

}

const calculateWin = function(board, n) {
    let totalSum = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            if(board[i][j] !== -1) {
                totalSum += board[i][j];
            }
        }
    }
    console.log(' the total sum is : ', totalSum * n);
    return totalSum * n;
}

main();
// console.log(answer)