const os= require('os')
const si = require('systeminformation');

function gettime() {
  const now = new Date();
  const hour=now.getHours()
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return `${hour}:${minute}:${second}`
}


function memuse(){
    const totalmem= ((os.totalmem())/1024/1024)
    const freeme=((os.freemem())/1024/1024)
    const usedmem=(totalmem-freeme).toFixed(1)
    const usagepercent=((usedmem/totalmem)*100).toFixed(2)
    return {used:usedmem,free:freeme.toFixed(1),tot:totalmem.toFixed(1),percent:usagepercent,time:gettime()}
}

function cpuusage(){
    const x=os.cpus();
    
    total=0
    for(i=0;i<x.length;i++){
        const core=x[i].times
        const totaltime=core.idle+core.irq+core.user+core.sys+core.nice;
        
        const usage = (100-((core.idle/totaltime)*100))
        total=total+usage
    }
return {totalusage:total.toFixed(1),time:gettime(),model:x[0].model}
}

async function cpuusage1(){
  try{
  const begin=os.cpus();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const end =os.cpus()
  let totalpercent=0
  console.log("hello2")
  for(i=0;i<begin.length;i++){
    const core=begin[i].times
    const coresec=end[i].times
    // for(j=0;j<5;j++){
      const changeidle=Math.abs(core.idle-coresec.idle)
      
      const changeirq=Math.abs(core.irq-coresec.irq)
      const changeuser=Math.abs(core.user-coresec.user)
      
      const changesys=Math.abs(core.sys-coresec.sys)

      const changenice=Math.abs(core.nice-coresec.nice)
      const totalnotused=changeidle/(changeidle+changeirq+changenice+changesys+changeuser)
      const percent =100-(totalnotused*100)
      totalpercent=totalpercent+percent
     }
    

  }
  
  const usage=totalpercent/(begin.length-6)
  console.log(usage)
  return {totalusage:usage.toFixed(1),time:gettime(),model:begin[0].model}
  

  }
  catch(err){
    console.log("error hava occured")

  }
  

}


// This is a function to get network usage information
async function getNetworkUsage2() {
  try {
    const networkStats = await si.networkStats();
    let timetransfered=networkStats[0].tx_sec
    let timerecieced=networkStats[0].rx_sec
    let transferedmegaby=((networkStats[0].tx_bytes)/(1024))
    let recivedmegaby= ((networkStats[0].rx_bytes)/(1024))
    let tranfermbpersec=(transferedmegaby/timetransfered).toFixed(4)
    let recievedmbpersec=(recivedmegaby/timerecieced).toFixed(4)
if(recievedmbpersec==Infinity||recievedmbpersec===NaN){
  recievedmbpersec=0;
}
if(tranfermbpersec==Infinity||tranfermbpersec===NaN){
  tranfermbpersec=0;
}
console.log(tranfermbpersec,recievedmbpersec)
return {send:tranfermbpersec,recive:recievedmbpersec,time:gettime()}
  } catch (error) {
    console.error('Error fetching network usage information:', error);
  }
}


async function getNetworkUsage() {
    try {
      // To get network stats at the start
      const startNetworkStats = await si.networkStats();
  
      // Wait for a specific time interval (like, 1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // To get network stats again after the time interval
      const endNetworkStats = await si.networkStats();
  
      // To calculate the rate of data transfer in bytes per second
      const bytesTransmitted = endNetworkStats[0].tx_bytes - startNetworkStats[0].tx_bytes;
      const bytesReceived = endNetworkStats[0].rx_bytes - startNetworkStats[0].rx_bytes;
  
      // To convert bytes to megabytes
      const megabytesTransmitted = bytesTransmitted / (1024 * 1024);
      const megabytesReceived = bytesReceived / (1024 * 1024);
  
      // To calculate the rate in MB/s
      const mbpsTransmitted = (megabytesTransmitted / 1); // 1 second interval
      const mbpsReceived = (megabytesReceived / 1); // 1 second interval
  
      console.log('Network Usage Information:');
      console.log(`Transmitted: ${mbpsTransmitted.toFixed(2)} MB/s`);
      console.log(`Received: ${mbpsReceived.toFixed(2)} MB/s`);
      if(mbpsReceived===NaN){
        const mbpsReceived=0;

      }
      else if(mbpsTransmitted===NaN){
        const mbpsTransmitted=0;

      }
      return {send:mbpsTransmitted,res:mbpsReceived,time:gettime()}
    } catch (error) {
      console.error('Error fetching network usage information:', error);
    }
  }


async function getdiskusage(){
    try{
      console.log("tryyyyyy")
        const startdiskusage=await si.fsStats()
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const enddiskusage=await si.fsStats()
        console.log("tryyyyyy1")
        const readspeed=(enddiskusage.rx_sec/1024).toFixed(2)
        const writespeed =(enddiskusage.wx_sec/1024).toFixed(2)
        console.log(readspeed,writespeed)
       
        return {read:readspeed,write:writespeed,time:gettime()}


    }
    catch(err){
      console.log("errrrrrrrrrrr")

    }
}

module.exports={cpuusage,cpuusage1,memuse,getNetworkUsage,getNetworkUsage2,gettime,getdiskusage}
