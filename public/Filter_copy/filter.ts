import express from 'express';
import {Request, Response} from "express";
import http from 'http';
import {Server as SocketIO} from 'socket.io';
import formidable from 'formidable'
import { Client } from "pg";
import dotenv from "dotenv";


dotenv.config();


const app = express();

app.use(express.static("public"));

app.get("/", function (req, res){
    const name = req.query.name;

})




const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

io.on("connection", function (socket) {
  console.log(socket);
});


const PORT = 8082;


server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});