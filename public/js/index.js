var socket= io(); //io() method is provided by the above library in scipt tag and it is used for initiating connection

socket.on('connect', function()
{
    console.log("Connected to server");
    
/*    socket.emit("createMessage", { // we are emitting only if connection is successful so nesting inside connect
        from:'akshaykumarb18@gmail.com',
        text:'you are my crush Anandi',
        
    }, function(data){console.log("Acknowlegment is recived by client which is "+data)})*/
    
  
});//connect is the inbuilt client event and socket.on works similarly like a io.on on server

socket.on('newMessage', function(newMessage) {
    console.log("New Message ",newMessage);
    var li=jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
    
});

socket.on('disconnect', function()
{
    console.log("disconnected from server");
    
});// disconnect is inbuilt event listner and listens only when server is down or stopped
    

jQuery('#message-form').on('submit', function(e){
    
    e.preventDefault(); // prevents defaut behaviour of browser which refreshes whole web page while submitting 
    
     socket.emit("createMessage", { // we are emitting only if connection is successful so nesting inside connect
        from:'user',
        text: jQuery('[name=message]').val()
        
    }, function(data){console.log("Acknowlegment is recived by client which is "+data)})
    
})