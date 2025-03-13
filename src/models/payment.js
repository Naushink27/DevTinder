const mongoose=require('mongoose')
 
const paymentSchema= new mongoose.Schema({
     userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
     }
    ,amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    PaymentId:{
        type:String
    },

    receipt:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    notes:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },membershipType:{
            type:String
        },
    }

})

const Payment= mongoose.model('Payment',paymentSchema)

module.exports=Payment;