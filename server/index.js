const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const PORT = 3001;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", socket => {
  console.log(`user is connected: ${socket.id}`);

  socket.on("join_room", data => {
    socket.join(data);
  });

  socket.on("send_message", data => {
    // socket.broadcast.emit("recieve_message", data);
    // console.log(data);
    socket.to(data.room).emit("recieved_message", data);
  });
});
app.listen(PORT, () => {
  console.log(`app is listening in ${PORT}`);
});
