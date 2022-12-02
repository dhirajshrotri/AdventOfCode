const partA = function (data) {
    // let zeros = data.map(s => {
    //     console.log(s);
    // }) 
}

const fs = require("fs");  // file system
let contents = fs.readFileSync("input.txt").toString().split("\n");

console.log(contents)
