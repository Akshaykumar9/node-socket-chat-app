class Users{
    
    constructor(){
        
        this.users =[];
    }
    
    //add user
    
    addUser(id, name, room){
        var user= {
            id,
            name, 
            room
        }
        
        this.users.push(user);
        return user;
    }
    
    removeUser(id){
        //return user that was removed
        var returneduser= this.users.filter((user)=> user.id===id)[0];
   //     this.users.indexOf(returneduser);
   
        if(returneduser){
          this.users=  this.users.filter((user)=> user.id!==id);
        }
        return returneduser;
        
    }
    
    getUser(id){
        var returneduser= this.users.filter((user)=> user.id===id)[0];
        return returneduser;
    }
    
    getUserList(room){
        var returnedusers= this.users.filter((user)=> user.room===room);//reutnrs users whos room is same as room argument
        
        var namesArray= returnedusers.map((user)=> user.name);//returns name of the user
        
        return namesArray;
        
        
        
    }
    
    
    
    
}



module.exports= {Users};