const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name : String,
    email : String, 
    age : Number
});

const User = mongoose.model("User", userSchema);
const Employee = mongoose.model("Employee", userSchema);


// let user1 = new User({
    //     name : "Adam",
    //     email : "adam@yahoo.in",
    //     age : 17
    // })
    
    // let user2 = new User({
        //     name : "eve",
        //     email : "eve@gmail.com",
        //     age : 14
        // })
        
        // user2.save()
        //     .then(res => {console.log(res)})
        //     .catch(e => {console.log(e)});
        
// User.insertMany([
//     {name : "Tony", email : "tony@gmail.com", age : 50},
//     {name : "Peter", email : "peter@gmail.com", age : 30},
//     {name : "Bruce", email : "bruce@gmail.com", age : 16}
// ]).then(res => {console.log(res)})
//     .catch(e => {console.log(e)});

// User.findOne({age : {$lt : 47}})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// User.findOne({_id : '66b5e6f3f3dad0da3a056897'})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// User.findById('66b5e6f3f3dad0da3a056897')
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// User.updateOne({name : "Peter"}, {age : 11})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// User.updateMany({age : {$gt : 15}}, {age : 20})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// User.findOneAndUpdate({age : 25}, {age : 18}, {new : true})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// User.findByIdAndUpdate("66b5e6f3f3dad0da3a056898", {age : 20}, {new : true})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

User.findOneAndDelete({name : "Adam"})
    .then(res => console.log(res))
    .catch(e => console.log(e));

// User.deleteMany({age : 20})
//     .then(res => console.log(res))
//     .catch(e => console.log(e));