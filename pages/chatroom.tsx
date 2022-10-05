import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

let socket;

type Message = {
  author: string;
  message: string;
};

const chatroom = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      fetch('/api/socket')
      socket = io()

    socket.on("connect", () => {
      console.log(socket.id);
    });
    
    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
    });

    return () => {
      socket.disconnect();
    };

    }, []);
 
  const sendMessage = async () => {
    socket.emit("createdMessage", { author: username, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: username, message },
    ]);
    setMessage("");
  };
  
    return (
      <div>
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <input
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Chat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMessage()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
            Send   
            </button>
          </div>
        </div>
  
        <div className="card">
        <div className="h-full last:border-b-0 overflow-y-scroll">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full py-1 px-2 border-b border-gray-200"
                      key={i}
                    >
                      {msg.author} : {msg.message}                      
                    </div>
                  );
                })}
              </div>
        </div>
      </div>
    );
  }

export default chatroom