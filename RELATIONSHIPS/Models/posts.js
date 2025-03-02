const express = require("express");
const mongoose = require("mongoose");
const {Schema} = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    name : String, 
    email : String
});

const postSchema = new Schema({
    content : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", postSchema);

const addData = async () => {
    // let user1 = new User({
    //     name : "Rahul",
    //     email : "rahul@gmil.com"
    // });
    
    // let post1 = new Post({
        //     content : "hello world",
        //     likes : 120,
        //     // user : user1
        // })
    
    // post1.user = user1;

    // await user1.save();
    // await post1.save();

    let user1 = await User.findOne({name : "Rahul"});
    
    let post2 = new Post({
        content : "byy byy",
        likes : 2
    })
    post2.user = user1;
    await post2.save();
}

// addData();

const getData = async () => {
    let result = await Post.findOne({}).populate("user", "name");
    console.log(result);
}

getData();