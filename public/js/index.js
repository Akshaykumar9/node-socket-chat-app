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

socket.on('newLocationMessage', function(newLocationMessage) {
    console.log("NewLocation Message ",newLocationMessage);
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${newLocationMessage.from}: `);
    a.attr('href', newLocationMessage.url);
    li.append(a);
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


var locationButton=jQuery('#send-location');

locationButton.on('click', function(){
    
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
        }
        
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            })
            
        }, function(){alert('unable to fetch locaiton')});
    
})