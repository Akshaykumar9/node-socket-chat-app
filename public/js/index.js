var socket= io(); //io() method is provided by the above library in scipt tag and it is used for initiating connection

function scrollToBottom(){
    //selectors
    var messages=jQuery("#messages");
    
    var newMessage=messages.children('li:last-child');//selects particular tags
    //heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop= messages.prop("scrollTop");
    var scrollHeight= messages.prop("scrollHeight");
    var newMessageheight= newMessage.innerHeight();
    var lastbeforemessageHeight=newMessage.prev().innerHeight();
    
    if(scrollTop+clientHeight+lastbeforemessageHeight+newMessageheight>=scrollHeight){
       messages.scrollTop(scrollHeight);// this will move to the bottom
        
    }
    
    
}

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
   var formattedTime= moment(newMessage.createdAt).format('h:mm a')
    //var template=jQuery('#message-template').html();
     var template=jQuery('#message-template').html();
    
    var html= Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt:formattedTime });
    
    jQuery('#messages').append(html);
    
    scrollToBottom();
    /*var formattedTime= moment(newMessage.createdAt).format('h:mm a');
    var li=jQuery('<li></li>');
    li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    jQuery('#messages').append(li);
    */
});

socket.on('newLocationMessage', function(newLocationMessage) {
    console.log("NewLocation Message ",newLocationMessage);
    var formattedTime= moment(newLocationMessage.createdAt).format('h:mm a');
    
     var template=jQuery('#message-template1').html();
    
    var html= Mustache.render(template, {
        url: newLocationMessage.url,
        from: newLocationMessage.from,
        createdAt:formattedTime });
    
    jQuery('#messages').append(html);
    
    scrollToBottom();
    /*var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${newLocationMessage.from} ${formattedTime}: `);
    a.attr('href', newLocationMessage.url);
    li.append(a);*/
    
     
});

socket.on('disconnect', function()
{
    console.log("disconnected from server");
    
});// disconnect is inbuilt event listner and listens only when server is down or stopped
    

jQuery('#message-form').on('submit', function(e){
    
    e.preventDefault(); // prevents defaut behaviour of browser which refreshes whole web page while submitting 
    
    var messageTextBox= jQuery('[name=message]');
    
     socket.emit("createMessage", { // we are emitting only if connection is successful so nesting inside connect
        from:'user',
        text: messageTextBox.val()
        
    }, function(data){
        text: messageTextBox.val('');
        console.log("Acknowlegment is recived by client which is "+data)})
    
})


var locationButton=jQuery('#send-location');

locationButton.on('click', function(){
    
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
        }
        
        locationButton.attr('disabled', 'disabled').text('Sending location');
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            })
            
        }, function(){
                     locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch locaiton')});
    
})