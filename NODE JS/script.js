//recive input into the js file 
// let args = process.argv;

// for(let i = 2; i < args.length; i++) {
//     console.log("hellow " + args[i]);
// }


//Use other file properties or functions
const someValue = require("./math.js");

console.log(someValue.PI);
console.log(someValue.sum(2,3));
console.log(someValue.mul(3,3));

const fruits = require("./Fruits");

console.log(fruits);
console.log(fruits[0]);
console.log(fruits[0].name);