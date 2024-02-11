const mysql =require("mysql2")
const ip=require('./index.js')

const {cpuusage1,memuse,getNetworkUsage,getNetworkUsage2,getdiskusage,cpuusage} =require("./usage.js") 


        const pool=mysql.createPool(
            {
                host:"127.0.0.1",
                user:"root",
                password:"yohannes",
                database:"monitor"
            }
        ).promise()
 



async function createcpu(){
    const useage= await cpuusage1()
    const totalusage=parseInt(useage.totalusage)
    const time =useage.time
    const result=await pool.query(`INSERT INTO cpu (time,totalusage) VALUES (?,?)`,[time,totalusage])
     
    
}

async function getcpuhistory(){
    try {
        
    const useage= await cpuusage1()
    var totalusage=parseInt(useage.totalusage)
    var time =useage.time
    const result=await pool.query(`SELECT * FROM cpu`)
    timeuse=[]
    totalusage=[]
    for(i=0;i<result[0].length;i++){
        if(result[0][i].time==''){
            timeuse.push('0:0:0')
        }
        else{
            timeuse.push(result[0][i].time)
        }
        
        totalusage.push(result[0][i].totalusage)
    }
    return {time:timeuse,totalusage:totalusage}
    } catch (error) {
        console.log("error at the get cpu history")
    }
}
async function createmem(){
    const useage= await memuse()
    const totalusage=parseInt(useage.percent)
    const time =useage.time
    const result=await pool.query(`INSERT INTO memory (time,totalusage) VALUES (?,?)`,[time,totalusage])
     
    
}
async function getmemhistory(){
    try {
        
    console.log("he")
    const useage=  memuse()
    var totalusage=parseInt(useage.percent)
    console.log(useage)
    var time =useage.time
    console.log(time)
    const result=await pool.query(`SELECT * FROM memory`)
    console.log(result[0])
    console.log(result[0].length)
    console.log("helllllllll")
    timeuse=[]
    totalusage=[]
    for(i=0;i<result[0].length;i++){
        if(result[0][i].time==''){
            timeuse.push('0:0:0')
        }
        else{
            timeuse.push(result[0][i].time)
        }
        
        totalusage.push(result[0][i].totalusage)
    }
    console.log(timeuse)
    console.log(typeof(getmemhistory))
    console.log({time:timeuse,totalusage:totalusage})
    return {time:timeuse,totalusage:totalusage}
    } catch (error) {
        console.log("error at the get cpu history")
    }
}
async function createdisk(){
    const useage= await getdiskusage()
    console.log(getdiskusage())
    const write_value=parseInt(useage.write)
    const read_value=parseInt(useage.read)
    
    
    const time =useage.time
    const result=await pool.query(`INSERT INTO disk (time, read_value,write_value) VALUES (?,?)`,[time,read_value,write_value])
     
    
}
async function getdiskhistory(){
    try {
        
    console.log("he")
    const useage= getdiskusage()
    var read_value=parseInt(useage.read)
    var write_value=parseInt(useage.write)
    console.log(useage)
    var time =useage.time
    console.log(time)
    const result=await pool.query(`SELECT * FROM disk`)
    console.log(result[0])
    console.log(result[0].length)
    console.log("helllllllll")
    timeuse=[]
    read=[]
    write=[]
    for(i=0;i<result[0].length;i++){
        if(result[0][i].time==''){
            timeuse.push('0:0:0')
        }
        else{
            timeuse.push(result[0][i].time)
        }
        
        read.push(result[0][i].read)
        write.push(result[0][i].write)
    }
    console.log(timeuse)
    console.log({time:timeuse,read:read,write:write})
    return {time:timeuse,read:read,write:write}
    } catch (error) {
        console.log("error at the get cpu history")
    }
}


async function createnetwork(){
    console.log("he")
    const useage= await getNetworkUsage2()
    const send=parseInt(useage.send)
    const recive=parseInt(useage.recive)
    console.log(useage)
    const time =useage.time
    console.log(time)
    const result=await pool.query(`INSERT INTO network (time,send,receive) VALUES (?,?,?)`,[time,send,recive])
     
    
}
async function genethistory(){
    try {
        
    console.log("he")
    const useage=  getNetworkUsage2()
    var sendone=parseInt(useage.send)
    var reciveone=parseInt(useage.recive)
    console.log(useage)
    var time =useage.time
    console.log(time)
    const result=await pool.query(`SELECT * FROM network`)
    console.log(result[0].receive)
    console.log(result[0].send)
    console.log("helllllllll")
    timeuse=[]
    send=[]
    recive=[]
    for(i=0;i<result[0].length;i++){
        if(result[0][i].time==''){
            timeuse.push('0:0:0')
        }
        else{
            timeuse.push(result[0][i].time)
        }
        
        send.push(result[0][i].send)
        recive.push(result[0][i].receive)
    }
    console.log(timeuse)
    console.log({time:timeuse,send:send,recive:recive})
    return {time:timeuse,send:send,recive:recive}
    } catch (error) {
        console.log("error at the get cpu history")
    }
}


console.log("heldodnds"+getcpuhistory().length)



module.exports={getcpuhistory,getmemhistory,createcpu,createmem,createdisk,getdiskhistory,genethistory,createnetwork}
