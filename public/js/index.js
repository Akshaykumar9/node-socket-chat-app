var socket=io(); //io() method is provided by the above library in scipt tag and it is used for initiating connection

socket.on('connect', function()
{
    console.log("Connected to server")
    
    socket.emit("createMessage", { // we are emitting only if connection is successful so nesting inside connect
        from:'akshaykumarb18@gmail.com',
        text:'you are my crush Anandi',
        
    })
});//connect is the inbuilt client event and socket.on works similarly like a io.on on server

socket.on('newMessage', function(newMessage) {
    console.log("New Message ",newMessage);
});

socket.on('disconnect', function()
{
    console.log("disconnected from server")
    
})// disconnect is inbuilt event listner and listens only when server is down or stopped
    