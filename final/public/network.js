
async function fetchData1() {
  try {
    const response = await fetch('/getip');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const ob =JSON.stringify(data,null,2)

    const parased=JSON.parse(ob)
  
    return parased.ip

  
  } catch (error) {
    console.error('Error0 fetching data:', error);
  }
}


const usage1=[]

const time=[]
const time1=[]
const usage2=[]
async function fetchData() {
    try {
      const ip=await fetchData1()
      const response = await fetch(`http://${ip}:5000/network`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      
      const ob =JSON.stringify(data,null,2)
  
      const parased=JSON.parse(ob)
      document.getElementById("send").innerHTML =parased.send;
      document.getElementById("recive").innerHTML =parased.recive;
      document.getElementById("time").innerHTML =parased.time;

console.log(parseInt(parased.recive).toFixed(1))
console.log(parseInt(parased.send).toFixed(1))

      
      if(usage1.length<10){
        usage1.push(parseInt(parased.recive).toFixed())
        time.push(parased.time)
      }
      else if(usage1.length>=10){
        usage1.shift()
        time.shift()
        usage1.push( parseInt(parased.recive).toFixed())
        time.push(parased.time)
      }
      console.log(usage1)
      console.log(time)
  
const xvalues = time;

const yvalues = usage1;

const y1values = usage2;
if(usage2.length<10){
  usage2.push(parseInt(parased.send).toFixed())
  time1.push(parased.time)
}
else if(usage2.length>=10){
  usage2.shift()
  time1.shift()
  usage2.push( parseInt(parased.send).toFixed())
  time1.push(parased.time)
}

console.log(usage2)
      console.log(time1)
new Chart("myChart", {
  type: "line",
  data: {
    labels: xvalues,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: "rgba(255,0,0,0.5)",
      borderColor: "rgba(255,0,0,1)",
      data: yvalues
    },{
      fill: true,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,0.5)",
      borderColor: "rgba(0,0,255,1)",
      data: y1values
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:3000}}],
    }
  }
});
  
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  fetchData()
  setInterval(fetchData,5000)




