import { Server } from "socket.io";
import messageHandler from "../../utils/messageHandler";

export default function SocketHandler(req, res) {
  //If the connection has been already setup
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  //creating new instance of the server
  const io = new Server(res.socket.server);

  //setup
  res.socket.server.io = io;

  // handling event on connection
  const onConnection = (socket) => {
    messageHandler(io, socket);
  };

 // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}