 type Icons = {
    [key:string]: string,
  
  }

const GetWeatherIconClasses=(text:string)=>{
    const WeatherIconClasses : Icons= {
        Clear: "wi wi-day-sunny",
        Overcast: "wi wi-cloud",
        Partlycloudy: "wi wi-day-cloudy",
        Patchyrainpossible: "wi wi-day-rain-mix",
        Sunny: "wi wi-day-sunny"
    }
    const removeSpace:string = text.split(" ").join("")
    try{ 
     return WeatherIconClasses[removeSpace]

    }catch(e){
        return "wi wi-day-sunny"
    }    
}
export default GetWeatherIconClasses;