
async function fetchData1() {
  try {
    // this is to fetch data from the backend
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
console.log("je")
async function fetchData() {
  try {
    const ip=await fetchData1()
    console.log(`${ip}:5000/cpu`)
    const response = await fetch(`http://${ip}:5000/cpu`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const ob =JSON.stringify(data,null,2)
    const parased=JSON.parse(ob)
    console.log(parased);
    document.getElementById("use").innerHTML =parased.totalusage;
    document.getElementById("model").innerHTML =parased.model;
    document.getElementById("time").innerHTML =parased.time;

    if(usage.length<10){
        usage.push(parseInt(parased.totalusage))
        time.push(parased.time)
      }
      else if(usage.length>=10){
        usage.shift(parseInt(parased.totalusage))
        time.shift(parased.time)
        usage.push(parseInt(parased.totalusage))
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

  
    console.error('Error fetching data:', error.message);
  }
}
fetchData()
setInterval(fetchData,5000)
