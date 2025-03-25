const mongoose=require('mongoose')

const connectionRequestSchema= new mongoose.Schema({
  
    fromUserId:{
        type:String,
        required:true,
        ref:"User"
  },
  toUserId:{
    type:String,
    required:true,
    ref:"User"
},
  status:{
    type:String,
    enum:["ignored","interested","accepted","rejected"]
  }
},{
    timestamps: true,
})

connectionRequestSchema.index={toUserId:1,fromUserId:1}

const ConnectionRequest= mongoose.model("connectionRequest",connectionRequestSchema);

module.exports= ConnectionRequest