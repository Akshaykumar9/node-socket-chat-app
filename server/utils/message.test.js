var expect= require('expect');

var {generateMessage, generateLocationMessage}= require("./message");


describe("generateMessage", ()=> { // describe is used for descibing what we are testing
    
    it('should generat correct message object', () => {
        
        var from = 'Anandi';
        var text = 'hello baby';
        var message= generateMessage(from,text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
        
    });
    
});


describe("generateLocationMessage", ()=> { // describe is used for descibing what we are testing
    
    it('should generat correct Locationmessage object', () => {
        
        var from = 'Anandi';
        var latitude = 13.1018343;
        var longitude= 80.2138113;
        var url="https://www.google.com/maps/?q=13.1018343,80.2138113";
        var message= generateLocationMessage(from,latitude, longitude);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
        
    });
    
});