module.exports.sum = (a,b) => a + b;
exports.mul = (a,b) => a * b;
let g = 9.8;
let PI = 3.14;

//we can not use exports in this form because this is seems as a variable not a treat lika a object
exports = 5;

// module.exports = {
//     sum : sum,
//     mul : mul,
//     g : g,
//     PI : PI,
// }

// module.exports = obj;