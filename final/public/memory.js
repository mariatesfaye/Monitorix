

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


const usage=[]
const time=[]
async function fetchData() {
    try {
      const ip=await fetchData1()
      const response = await fetch(`http://${ip}:5000/mem`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      const ob =JSON.stringify(data,null,2)
    console.log("hello")
      console.log(ob)
  
      const parased=JSON.parse(ob)
      document.getElementById("tot").innerHTML =parased.tot;
      document.getElementById("free").innerHTML =parased.free;
      document.getElementById("percent").innerHTML =parased.percent;
      document.getElementById("use").innerHTML =parased.used;
      document.getElementById("time").innerHTML =parased.time;

      
      if(usage.length<10){
        usage.push(parseInt(parased.percent))
        time.push(parased.time)
      }
      else if(usage.length>=10){
        usage.shift(parseInt(parased.percent))
        time.shift(parased.time)
        usage.push(parseInt(parased.percent))
        time.push(parased.time)

      }


      console.log(usage)
      console.log(time)
  
const xValues = time;
const yValues = usage;

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,0.1)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:100}}],
    }
  }
});
     
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  fetchData()
  setInterval(fetchData,5000)
