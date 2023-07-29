import logo from './logo.svg';
import axios from 'axios';
import SearchIcon from "@mui/icons-material/Search";
import './App.css';
import { useEffect, useState } from 'react';
import clouds from './Assets/clouds-in-png-7.png'
import clear from './Assets/clear.png'
import drizzle from './Assets/drizzle.png'
import mist from './Assets/mist.jpeg'
import rainy from './Assets/rainy.png'

function App() {

  const [data,setData]=useState({
    celcius:10,
    name:'London',
    humidity:'10',
    speed:2,
    image:'/Assets/clouds-in-png-7.png'
  })
  const [location,setLocation]=useState('')
  const [error,setError]=useState('')

// useEffect(()=>{

    
//   },[])

const handleclick=()=>{
  if(location !==''){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7a1f5cfbbd9da6b274813a539443d55f&units=metric`
  
    axios.get(url)
    .then(res=> {
      let imagePath='';
      if(res.data.weather[0].main==='clouds'){
        imagePath='/Assets/clouds-in-png-7.png'
      }else if(res.data.weather[0].main=='Clear'){
        // imagePath='/Assets/clear.png'

        imagePath=<img src={clear}/>
      }else if(res.data.weather[0].main=='Rain'){
        imagePath=<img src={rainy}/>
      }else if(res.data.weather[0].main=='Drizzle'){
        // imagePath='/Assets/clouds-in-png-7.png'
        imagePath=<img src={drizzle}/>
      }else if(res.data.weather[0].main=='Mist'){
        // imagePath='/Assets/clouds-in-png-7.png'
        imagePath=<img src={mist}/>
      }else if(res.data.weather[0].main==''){
        // imagePath='/Assets/clouds-in-png-7.png'
        imagePath=<img src={clear}/>
      }
      setData({...data,celcius:res.data.main.temp,name:res.data.name,
        humidity:res.data.main.humidity,speed:res.data.wind.speed,feels:res.data.main.feels_like,image:imagePath})
        console.log(res)
      })
      .catch(err=>{
        if(err.res.stauts ===404){
          setError('Invalid City Name')
        }else{
          setError('')
        }
      
      console.log(err)
      })
  }
}

 

  return (
    <div >
     <div className="Main">
      <div className='search'>
        <input
        value={location}
        onChange={event=> setLocation(event.target.value)}
    
    placeholder='Enter Location'
    type='text'
/>
    <button style={{width:'40px',height:'50px',borderRadius:'10px',background: "rgb(255,255,255,0.1)"}} onClick={handleclick}>  <SearchIcon style={{fontSize:'xx-large',color:''}} ></SearchIcon></button>
      </div>
<div className='error'>
  <h1>{error}</h1>
</div>

{!location ? (
<p style={{display:'flex',justifyContent:'center',marginTop:'200px',fontSize:'50px'}}>No Data Found <br/> Please Search City</p>
  ) :(

    <div className="container">
        <div className="top">
            <div className="location">
                <h2>{data.name}</h2>
            </div>
            <div className="temp">
                <h1>{Math.round(data.celcius)}°C</h1>
            </div>
            <div className="description">
              <img style={{width:'200px',height:'200px'}} src={data.image} alt='404 not found'/>
                <p>Clouds</p>
            </div>
        </div>
        <div className="bottom">
            <div className="feels">
            <p className='bold'>{data.feels} F</p>
            <p>Feels Like</p>
            </div>
            <div className="humidity">
                <p className='bold'>{data.humidity}%</p>
                <p>Humidity</p>
            </div>
            <div className="wind">
               <p className='bold'>{data.speed}</p> 
                <p>Wind Speed</p>
            </div>
        </div>
        

     
     
    </div>
  )
}

    </div>
    </div>
  );
}

export default App;
