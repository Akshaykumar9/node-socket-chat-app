const path=require("path");
const publicpath=path.join(__dirname, "../public");
/*console.log(__dirname+"/../public") //this is not recommended
console.log(publicpath)// this is recommended*/

const http= require("http");// it's a built in node module, which is used by express to create web server
const socketio=require("socket.io");//it is used to create seemless connection between server and client
const express=require("express");

const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validators.js");
const {Users} = require("./utils/users");
var users = new Users();

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
    
    
    
    socket.on('join', function(params, callback) {
      var user=users.getUser(socket.id);
      var roomname=params.room.toLowerCase();
      console.log(roomname)
        console.log(!isNaN(Number(params.name)));
          if(!isRealString(params.name) || !isNaN(Number(params.name))){
            return callback('Name and Room name are required');
        }
    
        socket.join(roomname); // this method is used for joining a room
        // scoket.leave() method is used for leaving the room
        
        //io.to(roomname).emit() will send messages to all users in the room including the one who sent it
        //socket.braodcast.to(roomname).emitI() // will send messages to all uses excluding the one who sent it
        // socket.emit will send messages to user who joined as usal
        users.removeUser(socket.id); // removing users from other room with same sockt id
        users.addUser(socket.id, params.name, roomname);//adding user to the room
        
        io.to(roomname).emit('updatedUsersList', users.getUserList(roomname));
        socket.emit('newMessage', generateMessage('Admin', `Welcome ${params.name}`));
        socket.broadcast.to(roomname).emit('newMessage',generateMessage('Admin',`${params.name} has joined the room`));
        
        
        callback();
        
        
    })
    
    socket.on('createMessage', function(createdMessage, callback) {
        console.log("created message", createdMessage);
        
        var user=users.getUser(socket.id);
       
        if(user && isRealString(createdMessage.text)){
        
        io.to(user.room).emit('newMessage', generateMessage(user.name, createdMessage.text)); // this is will emit message to all other user including the one who created
        
        /*socket.broadcast.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text)); // this will emit message nto all other user exclusing the one who created, this is called broadcasting
        
*/    
            }
 callback('Acknowledged by server');
     });
     
     
     socket.on('createLocationMessage', (coords) => {
         
            var user=users.getUser(socket.id);
         if(user){
         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
         }
     });
    socket.on('disconnect', function(){
        console.log(`client disconnected`);
    var user=users.removeUser(socket.id);
    console.log('userlist',users.getUserList(user.room));
    if(user){
    io.to(user.room).emit('updatedUsersList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the conversation`));
    }
    
    });
        
}); //io is event listner and connection is a built in event

server.listen(process.env.PORT || 3000, process.env.IP, () => console.log(`server started on ${process.env.PORT}`));// we're using server instead of app because we are explicitly creating http server


