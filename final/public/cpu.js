
async function fetchData1() {
  try {
    // Fetch data from the backend
    const response = await fetch('/getip');
    
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();
    const ob =JSON.stringify(data,null,2)

    // console.log(ob)
    // console.log(typeof(ob))
    const parased=JSON.parse(ob)
    // Use the data in the frontend
    // console.log(response.body)
    // console.log(parased.ip)
    return parased.ip

    // You can update your HTML or perform other actions with the data
  } catch (error) {
    console.error('Error0 fetching data:', error);
  }
}
// console.log(fetchData1())

// console.log("d")

// Call the async function

const usage=[]
const time=[]
console.log("je")
async function fetchData() {
  try {
    const ip=await fetchData1()
    console.log(`${ip}:5000/cpu`)
    const response = await fetch(`http://${ip}:5000/cpu`);
    // console.log(response.status)
    // console.log("hello")
    // console
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Display or manipulate the data as needed
    // console.log(data);
    // console.log(typeof(data))
    
    const ob =JSON.stringify(data,null,2)

    // console.log(ob)
    // console.log(typeof(ob))
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

  
    // console.log(parased.time);
    // console.log(typeof(parased))
    
    // return JSON.parse(ob).totalusage
    // if(arr.lenght<5){

    //   arr.push({time:JSON.parse(ob).time,totol:JSON.parse(ob).totalusage})

    // }
    // else if(arr.length>=5){
    //   arr.shift()
    //   arr.push({time:JSON.parse(ob).time,totol:JSON.parse(ob).totalusage})


    // }
    // console.log(arr[0])
    // console.log(arr)
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}
fetchData()
// Call the function to fetch data
// if()
setInterval(fetchData,5000)
