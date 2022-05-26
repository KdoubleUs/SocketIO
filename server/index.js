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
  socket.on("send_message", data => {
    console.log(data);
  });
});
app.listen(PORT, () => {
  console.log(`app is listening in ${PORT}`);
});
