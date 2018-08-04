const expect= require("expect");

const {Users}=require("./users");


//decribe 

describe('Users', () => {
    //beforeEach method is called before every IT call, used for initilising data
    var newusers;
    
    beforeEach(()=>{
      newusers= new Users();
      
      newusers.users= [{
          id:"1",
     name:"An",
     room:"love"
    }
     ,
     {
         id:"2",
     name:"Anan",
     room:"lover"
    },
    {id:"3",
     name:"Anandi",
     room:"love"
    }]
});
    
    //should Add Users

    it('Should Add User', () => {
        //expect(newUser.addUser(user.id,user.name,user.room)).toInclude({id, name, room}); 
        var newUser= new Users();
   
    
    var user= { id:"1",
     name:"Anandi",
     room:"love"
    };
    newUser.addUser(user.id,user.name,user.room);
        
        expect(newUser.users).toEqual([user]);
    });
    
    
   it('Should return name of the users in the love room', ()=>{
       var userList=newusers.getUserList('love');
       
       expect(userList).toEqual(['An', 'Anandi']);
   }); 
   it('Should return name of the users in the lover room', ()=>{
       var userList=newusers.getUserList('lover');
       
       expect(userList).toEqual(['Anan']);
   }); 
   
    it('Should return name of the user who removed from the room', ()=>{
        var userId='1';
       var user=newusers.removeUser(userId);
       expect(user.id).toBe(userId);
       expect(newusers.users).toExclude([user]);
   }); 
   
      it('Should not remove the user', ()=>{
       var user=newusers.removeUser('123');
       
       expect(user).toNotExist();
         expect(newusers.users.length).toBe(3);
   }); 
   
   
    it('Should get name of the user', ()=>{
        var userId='1';
       var user=newusers.getUser(userId);
       expect(user.id).toBe(userId);
   }); 
   
   it('Should not find a user', ()=>{
       var user=newusers.getUser('123');
       expect(user).toNotExist();
   }); 
   
   
    
});

