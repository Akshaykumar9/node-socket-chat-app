const path=require("path")
const publicpath=path.join(__dirname, "../public");
/*console.log(__dirname+"/../public") //this is not recommended
console.log(publicpath)// this is recommended*/

const http= require("http");// it's a built in node module, which is used by express to create web server
const socketio=require("socket.io");//it is used to create seemless connection between server and client
const express=require("express");
var app= express();
var server=http.createServer(app);//explictly mentioning this because we want to create a socketio between server and client
var io= socketio(server);// making http sever to use the socketio and this means we are ready to accept new connections

app.use(express.static(publicpath));

io.on('connection', (socket)=>{
    console.log("New user connected")
    
    socket.on('disconnect', ()=>console.log(`client disconnected`));
    
}) //io is event listner and connection is a built in event

server.listen(process.env.PORT, process.env.IP, () => console.log(`server started on ${process.env.PORT}`))// we're using server instead of app because we are explicitly creating http server


