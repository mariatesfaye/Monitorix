
// async function fetchData1() {
//     try {
//       // Fetch data from the backend
//       const response = await fetch('/getip');
      
//       // Check if the request was successful (status code 200)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
    
//       const data = await response.json();
//       const ob =JSON.stringify(data,null,2)
  
//       const parased=JSON.parse(ob)
     
//       return parased.ip
  
//       // You can update your HTML or perform other actions with the data
//     } catch (error) {
//       console.error('Error0 fetching data:', error);
//     }
//   }

//   const usage=[]
//   const time=[]
// //   console.log("je")
  async function fetchData() {
    try {

      const response = await fetch("/history");

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const ob =JSON.stringify(data,null,2)
      const parased=JSON.parse(ob)
      const xValues=[]
    const yvalues=[]

for(var i=0;i<parased.time.length;i++){
xValues.push(parased.time[`${i}`])
yvalues.push(parased.totalusage[`${i}`])
}

    
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yvalues
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
  // Call the function to fetch data
  // if()
//   setInterval(fetchData,5000)
  
async function fetchData1() {
    try {

      const response = await fetch("/historymem");

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const ob =JSON.stringify(data,null,2)
      const parased=JSON.parse(ob)
      const xValues=[]
    const yvalues=[]

for(var i=0;i<parased.time.length;i++){
xValues.push(parased.time[`${i}`])
yvalues.push(parased.totalusage[`${i}`])
}

    
new Chart("myChart1", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yvalues
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
  fetchData1()
  
async function fetchData2() {
    try {

      const response = await fetch("/historymem");

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const ob =JSON.stringify(data,null,2)
      const parased=JSON.parse(ob)
      const xValues=[]
    const yvalues=[]

for(var i=0;i<parased.time.length;i++){
xValues.push(parased.time[`${i}`])
yvalues.push(parased.totalusage[`${i}`])
}



new Chart("myChart2", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "red",
      fill: false
    }, { 
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "green",
      fill: false
    }, { 
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});
    
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  fetchData2()

  
async function fetchData3() {
  try {

    const response = await fetch("/historynetwork");

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // console.log(data)
    const ob =JSON.stringify(data,null,2)
    // console.log(ob)
    const parased=JSON.parse(ob)
    console.log(parased)
    const xValues=[]
    const yvalues1=[]
  const yvalues=[]

for(var i=0;i<parased.time.length;i++){
xValues.push(parased.time[`${i}`])
yvalues.push(parased.recive[`${i}`])
yvalues1.push(parased.send[`${i}`])
}


// const xValues = [100,200,300,400,500,600,700,800,900,1000];
new Chart("myChart3", {
  type: "line",
  data: {
    labels: xValues,
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
      data: yvalues1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:3000}}],
    }
  }})
}
catch(err){
console.error('Error fetching data:', error.message);
}
    
  
  }
fetchData3()