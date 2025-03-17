const socket=require('socket.io')

const initializeSocket=(server)=>{
   const io= socket (server,{
    cors:{
        origin:"http://localhost:5173"
    }
   })

   io.on("connection",(socket)=>{
    socket.on("joinChat", ({ userId, targetUserId }) => {
        if (!userId || !targetUserId) return;
        const roomId = [userId, targetUserId].sort().join("_"); // Ensure consistency
        console.log("User joined room:", roomId);
        socket.join(roomId);
    });
    
    socket.on("sendMessage",()=>{})
    socket.on("disconnet",()=>{})
   })
}
module.exports=initializeSocket