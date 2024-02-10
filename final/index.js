const express=require('express');

const port =5000;
const app= express();
const {genethistory} =require("./database.js")
const {getcpuhistory, getmemhistory,createmem,createcpu, createdisk,createnetwork} =require("./database.js")
const {cpuusage,cpuusage1,memuse,getNetworkUsage,getNetworkUsage2,gettime,getdiskusage}=require("./usage.js")
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var ip=[]

app.post("/getserver",(req,res)=>{
    // ip.pop()
    ip.push(req.body.dataInput)
    // var currentip=ip.pop()
    console.log("find server")
    console.log(ip)
    // console.log(currentip)
    // ip.pop()
    // console.log(currentip)
    
    res.redirect('/cpu.html')
})
// createmem()
console.log(ip)
app.get("/getip",(req,res)=>{
    // currentip
    console.log("getip")
    console.log(ip[0])
    res.json({"ip":`${ip[0]}`})
    // ip.push(currentip.pop())
    // ip.pop()

    

})
app.get("/history",async(req,res)=>{
    console.log("what")
    // console.log(typeof(getcpuhistory))
    res.send(await getcpuhistory())
    // res.send(await getmemhistory())

})
app.get("/historymem",async(req,res)=>{
    console.log("what")
    
    res.send(await getmemhistory())

})

app.get("/historydisk",async(req,res)=>{
    console.log("what")
    
    res.send(await getdiskusage())

})
app.get("/historynetwork",async(req,res)=>{
    console.log("what")
    
    res.send(await genethistory())

})
    
// createnetwork()


setInterval(createcpu,5000)
// setInterval(createdisk,5000)
setInterval(createmem,5000)
setInterval(createnetwork,5000)

// function changeserver(){
//     return '${ip}:5000'
  
//   }
// console.log(createcpu())
  
app.get("/network",async(req,res)=>{
    
    res.send(await getNetworkUsage2())
})
app.get("/mem",(req,res)=>{
    res.send(memuse())

})
// app.get("/cpu",(req,res)=>{
//     res.send(cpuusage())

// })
app.get("/cpu",async (req,res)=>{
    res.send( await cpuusage1())

})
app.get("/disk",async(req,res)=>{
    res.send(await getdiskusage())
})


app.listen(port,()=>{
    console.log(`app is kjds in ${port}`)
    // getdiskusage()

   
})

// module.exports=ip

