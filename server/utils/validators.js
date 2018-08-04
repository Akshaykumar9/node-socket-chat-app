var isRealString= (str)=>{
    
    return typeof str === 'string' && str.trim().length>0 && isNaN(Number(str));
};


// str= '               f        r                   '
// then str.trim() will give output as 'f        r'
module.exports={isRealString};