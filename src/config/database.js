const mongoose= require('mongoose');
const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://naushink2709:SgJEukdyDbsGNLGe@namastenode.gvret.mongodb.net/devTinder")
}

module.exports=connectDB;

