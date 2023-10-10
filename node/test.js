var hello = "Hello from Node JS Variable!"
var path = require("path");
console.log(`printing variable hello: ${hello}`);

console.log("directory name: " + __dirname);
console.log("directory and file name: " + __filename);

console.log("Using PATH module:");
console.log(`Hello from file ${path.basename(__filename)}`);

console.log(`Process args: ${process.argv}`);