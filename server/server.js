const path=require("path")
const publicpath=path.join(__dirname, "../public");
/*console.log(__dirname+"/../public") //this is not recommended
console.log(publicpath)// this is recommended*/

const http= require("http");// it's a built in node module, which is used by express to create web server
const socketio=require("socket.io");//it is used to create seemless connection between server and client
const express=require("express");

const {generateMessage} = require("./utils/message")

var app= express();
var server=http.createServer(app);//explictly mentioning this because we want to create a socketio between server and client
var io= socketio(server);// making http sever to use the socketio and this means we are ready to accept new connections

app.use(express.static(publicpath));

io.on('connection', function(socket){
    console.log("New user connected");
   /* 
    socket.emit('newMessage', {
        from:'Anandhisampath@gmail.com',
        text:'Dont know what to say', 
        createdAt : new Date().getDate()
    });// used to create new event*/
    
    socket.emit('newMessage', generateMessage('Anandi', 'Welcome user'));
    socket.broadcast.emit('newMessage',generateMessage('Anandi','new user joined'));
    
    socket.on('createMessage', function(createdMessage, callback) {
        console.log("created message", createdMessage);
        callback('Acknowledged by server');
        
        io.emit('newMessage', { from: createdMessage.from, text: createdMessage.text, createdAt: new Date().getTime()}); // this is will emit message to all other user including the one who created
        
        /*socket.broadcast.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text)); // this will emit message nto all other user exclusing the one who created, this is called broadcasting
        
*/    
        
        
    });
    socket.on('disconnect', function(){console.log(`client disconnected`)});
    
}) //io is event listner and connection is a built in event

server.listen(process.env.PORT, process.env.IP, () => console.log(`server started on ${process.env.PORT}`))// we're using server instead of app because we are explicitly creating http server


