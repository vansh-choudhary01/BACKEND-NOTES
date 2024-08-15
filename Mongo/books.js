const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

let bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true,
        maxLength: 20
    },
    author: {
        type : String
    },
    price: {
        type : Number,
        min : [1, "Price is too low for Amazon selling price"]
    },
    discount: {
        type : Number,
        default: 0
    },
    // category: {
    //     type : String,
    //     enum : ["fiction", "non-fiction"]
    // }
    genre: [String]
});

let Book = new mongoose.model("Book", bookSchema);

// let book1 = new Book({
//     title : "Mathematics XII",
//     author : "RD Sharama",
//     price : 1200
// });

// book1.save()
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// let book2 = new Book({
//     title: "MARVEL II",
//     price : 1309,
//     // price: -10,
//     // category : "fiction"
//     genre: ["comics", "superheroes", "fiction"]
// })

// book2.save()
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

// Book.findByIdAndDelete('66b994f175cbea07ccdc9306')
//     .then(res => console.log(res))
//     .catch(e => console.log(e));

Book.findByIdAndUpdate('66b99bb2efd8a3e1c92488b6', {price: -500}, {runValidators: true})
    .then(res => console.log(res))
    .catch(err => console.log(err.errors.price.properties.message));