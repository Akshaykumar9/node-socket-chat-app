var expect= require("expect");

//import isRealString


const {isRealString}= require("./validators");

//decribe isRealString

describe('isRealString', () => {
    //should rehject non-string values


    
    it('Should reject non-string values', () => {
        
       expect(isRealString('213')).toBe(false); 
    });
    
    //should reject String only spaces


    it('Should reject string with spaces', () => {
        
       expect(isRealString('      ')).toBe(false); 
    });
    //should allow string with non space characters
    
    it('Should allow string with spaces also with characters', () => {
        
       expect(isRealString('        a          c      ')).toBe(true); 
    });
})

