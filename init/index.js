const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
main()
.then(()=>{
    console.log('connection succesful');
})
.catch((err)=>{
    console.log('connection failed');
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlist');
}

const initdb = async ()=>{
    await Listing.deleteMany({});
    initdata.data =  initdata.data.map((obj)=>({...obj,owner:"6934216726f930cf8027e149"}));
    await Listing.insertMany(initdata.data);
    console.log("data saved");
}
initdb();

