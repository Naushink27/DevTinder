const socket=require('socket.io')
const crypto = require("crypto");
const Chat=require('../models/chat')
const getSecretRoomId = (userId, targetUserId) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("$"))
      .digest("hex");
  };

const initializeSocket=(server)=>{
    console.log("🛠️ Initializing WebSocket server..."); 
   
    const io = socket(server, {
        cors: {
            origin: ["http://localhost:5173", "https://localhost:5173"], // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
        },
      });
  
      io.on("connection", (socket) => {
       
        console.log("✅ New WebSocket Connection:", socket.id);
        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            if (!userId || !targetUserId) {
                console.error("❌ Missing userId or targetUserId");
                return;
            }
            const roomId=getSecretRoomId(userId,targetUserId)
          console.log(firstName + " joined Room : " + roomId);
          socket.join(roomId);
        });
      socket.on("sendMessage",async({firstName, userId,targetUserId, text})=>{
        try{
          const roomId=getSecretRoomId(userId,targetUserId)
          console.log(firstName+": "+text)
           let chat= await Chat.findOne({participants:[userId,targetUserId]})
        if(!chat){
          chat = new Chat({
            participants:[userId,targetUserId],
            message:[]
          })
        }
        chat.message.push({
          senderId:userId,
          text:text
        })

         chat.save()


          io.to(roomId).emit("messageRecieved",{firstName,text})



        }catch(err){
          console.error(err)
        }
   
      })

    })
}

module.exports = initializeSocket;