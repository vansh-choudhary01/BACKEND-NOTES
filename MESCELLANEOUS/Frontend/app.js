//factory function to make multiple persons with there name and age
// function personMaker(name, age) {
//     let person = {
//         name : name,
//         age : age,
//         talk() {
//             console.log(`Hi, I am ${name}`);
//         }
//     }
//     return person;
// }

// let p1 = personMaker("adam", 25);
// let p2 = personMaker("eve", 25);


// Constructer does not return anything & start with capital
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//     // run function do not store in prototipe
//     this.run = () => {
//         console.log("runing");
//     }
// }

// Person.prototype.talk = function() {console.log(`Hellow, my name is ${this.name}`)};

// let p1 = new Person("raman", 19);
// let p2 = new Person("aditya", 19);

// Using Class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log(`Hi, I am ${this.name}`);
    }
}

let p1 = new Person("vansh", 18);
let p2 = new Person("rahul", 29);

class Student extends Person {
    constructor(name, age, marks) {
        super(name, age);
        this.marks = marks;
    }
    eat() {
        console.log("eating");
    }
    //when we rewrite the talk function then child class function will run always (Student talk function will run)
}

let s1 = new Student("raghav", 15, 96);
let s2 = new Student("raghav", 15);