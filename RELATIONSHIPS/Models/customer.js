const express = require("express");
const mongoose = require("mongoose");
const {Schema} = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref : "Order",
        }
    ]
})

const orderSchema = new Schema({
    item : String,
    price : Number,
})

userSchema.post("findOneAndDelete", async (user) => {
    if(user.orders.length) {
        await Order.deleteMany({_id : {$in : user.orders}});
        console.log("order's deleted");
    }
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", userSchema);

const findCustomer = async () => {
    let res = await Customer.find({}).populate("orders");
    console.log(res);
}

// findCustomer();

const addCustomer = async () => {
    let cust1 = new Customer({
        name : "Rahul Kumar"
    });

    let order1 = await Order.findOne({item : "Samosa"});
    let order2 = await Order.findOne({item : "Chocolate"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let res = await cust1.save();
    console.log(res);
}

// addCustomer();

const addOrder = async () => {
    let res = await Order.insertMany([
        {item : "Samosa",price : 12},
        {item : "Chips", price : 10},
        {item : "Chocolate", price : 40}
    ])

    console.log(res);
}

// addOrder();

const addCust = async () => {
    let newCust = new Customer({
        name : "Karan Arjun",
    })

    let newOrder = new Order({
        item : "Pizza", 
        price : 250,
    })

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
}

// addCust();

const deleteCustomer = async () => {
    let user = await Customer.findByIdAndDelete({_id : '66e56f5cd766f4436e9d863f'});
    console.log(user);
}

deleteCustomer();