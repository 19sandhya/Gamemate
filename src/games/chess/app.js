const express = require('express');
const socket = require('socket.io')();
const http = require('http');
const {Chess} = require('chess.js');
const path = require('path');
const { title } = require('process');


const app = express();
const server = http.createServer(app); // create a server using the express app

const io = socket.listen(server); // attach socket.io to the server

const chess = new Chess();

let player = {};
let currentPlayer = "W";


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index" ,{title: "Chess Game"});
    }
);



io.on("connection", (socket) => {
    console.log("A user has connected");

    if(!player.white){
        player.white = socket.id; //is line ka mtlb h k agr player white nhi h to usko white bna do 
        socket.emit("palyerRole", "W"); 
    }
    else if(!player.black){
        player.black = socket.id; //is line ka mtlb h k agr player black nhi h to usko black bna do
        socket.emit("palyerRole", "B");
    }
    else{
        socket.emit("err", "Room is full");
    }

    socket.on("disconnect", () => {
        if(player.white === socket.id){
            player.white = null;
        }
        if(player.black === socket.id){
            player.black = null;
        }
    });

    socket.on("move", (msg) => {
       try{

        //inn if conditions se check kr rhe h k kis player ka turn h
        //agar white ki turn hai or black player ne move kiya to usko error msg bhej do
        if(chess.turn()=== "w" && socket.id!== player.white){
            socket.emit("err", "Its not your turn");
            return;
        }

        if(chess.turn()=== "b" && socket.id!== player.black){
            socket.emit("err", "Its not your turn");
            return;
        }

        //agr move valid h to usko move kr do
        const move = chess.move(msg);
        if(move){
            currentPlayer = chess.turn(); //agr move valid h to turn change kr do
            io.emit("move", msg); //sabko move bhej do
            io.emit("boardState", chess.fen()); //sabko board ki state bhej do. fen function se board ki state nikal rhe h
        }else{
            console.log("Invalid move", msg);
            socket.emit("err", "Invalid move");
        }
       }
       catch(err){
                console.log("Invalid move", msg);
              socket.emit("err", "Invalid move");
              return;
       }
    });



});


server.listen(3001, () => {
    console.log("Server is running on port 3001");
});

