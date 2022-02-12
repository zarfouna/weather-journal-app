/* Global Variables */
const weatherBaseURL='https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey='&appid=e6418079e69da73eb4e0b322bc9c9054&units=metric'
const zip=document.getElementById('zip')
const feelings=document.getElementById('feelings')
const icon=document.getElementById('icon')
const city=document.getElementById('zip-update')
const weather=document.getElementById('weather')
const temperature=document.getElementById('temperature')

const perform=()=>{
     getData(weatherBaseURL+zip.value+apiKey).then(data=>{
         const newData={}
         newData['data']= newDate()
         newData['temperature']=data.main.temp
         newData['feelings']=feelings.value
         newData['city']=data.name
         newData['weather']=data.weather[0].description
          newData['icon']=data.weather[0].icon
            console.log(newData)
        postData('/add',newData).then(data=>{
            getData('/all').then(data=>{
                updateUI(data)
            })
        })    
     })
}
const getData=async(url='')=>{
    const response=await fetch(url)
    try{
        const newData=await response.json()
        return newData;
    }
    catch(error){
        console.log("error",error.message)
    }
}
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error.message);
    }
};
const updateUI=(data)=>{
     /*  location.value= 
  weather.value=  */
  console.log(data)
  temperature.innerHTML= data.temperature
  weather.innerHTML=data.weather
  city.innerHTML=data.city
  icon.src= `http://openweathermap.org/img/wn/${data.icon}@2x.png`

}

// Create a new date instance dynamically with JS
const newDate=()=>{
const d = new Date(); 
return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

document.getElementById('generate').addEventListener('click',perform)
