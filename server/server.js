const path=require("path")
const publicpath=path.join(__dirname, "../public");
/*console.log(__dirname+"/../public") //this is not recommended
console.log(publicpath)// this is recommended*/

const express=require("express");
var app= express();
app.use(express.static(publicpath));

app.listen(process.env.PORT, process.env.IP, () => console.log(`server started on ${process.env.PORT}`))

