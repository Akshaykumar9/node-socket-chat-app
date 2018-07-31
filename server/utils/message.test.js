var expect= require('expect');

var {generateMessage}= require("./message");


describe("generateMessage", ()=> { // describe is used for descibing what we are testing
    
    it('should generat correct message object', () => {
        
        var from = 'Anandi';
        var text = 'hello baby';
        var message= generateMessage(from,text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
        
    });
    
});