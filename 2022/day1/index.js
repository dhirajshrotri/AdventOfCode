const fs = require('fs');
const readline = require('readline');

const findMaxCaloriesPart1 = function(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            let maxCalories = -1;
            let runningTotal = 0;
            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false
            });

            for await (const line of rl) {
                if(!line) {
                    if (runningTotal > maxCalories)
                        maxCalories = runningTotal;
                    runningTotal = 0;
                }
                else {
                    runningTotal += parseInt(line);
                }
            }

             resolve(maxCalories);
        }
        catch(err) {
            reject(err);
        }

    })
}

const findMaxCaloriesPart2 = function (filename) {
    return new Promise(async (resolve, reject) => {
        try {
            let arr = new Array(3).fill(-1);
            let runningTotal = 0;
            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false
            });

            for await (const line of rl) {
                if(!line) {
                    if (runningTotal > arr[0]){
                        arr[0] = runningTotal;
                        arr.sort((a, b) => a - b);
                    }
                    runningTotal = 0;
                }
                else {
                    runningTotal += parseInt(line);
                }
            }
            
            resolve(arr.reduce((a, acc) => a + acc), 0);
        }
        catch(err) {
            reject(err);
        }

    })
}

const main = async function() {
   let caloriesPart1 = await findMaxCaloriesPart1('./input2.txt');
   let caloriesPart2 = await findMaxCaloriesPart2('./input2.txt');

   console.log(caloriesPart1);
   console.log(caloriesPart2);
}

main();
