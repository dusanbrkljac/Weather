<template>
  <div id="app" :class=" weather != null &&  weather.current.temperature > 15 ?  'warm' : ''    "> 
      <main>
              <h3 class="title">Weather Forecast</h3>

        <div class="search-box">
          <input type="text" class="search-input" placeholder="Sreach..." v-model="city" @keyup.enter="fetchWeatherData">
        </div>

        <div  class="weather-div" v-if="weather != null"  >
          <div class="location-box">
            <div class="location">{{weather.location.name}}, {{weather.location.country}} </div>
            <div class="date">{{weather.location.localtime}} </div>
          </div>

          <div class="weather-box">
            <div class="temp"> {{weather.current.temperature}}℃</div>
            <div class="weather">{{ weather.current.weather_descriptions[0]  }}</div>
          </div>

        </div>

        <div class="overTablet">
          <select class="allCity" v-model="selected" >
            <option disabled value="">Please select city</option>
            <option>Beograd</option>
            <option>Moskva</option>
            <option>Banja Luka</option>
            <option>Podgorica</option>
            <option>Berlin</option>
            <option>London</option>
          </select>
        </div>


      </main>

  </div>
</template>

<script>

export default {
    data(){
      return{
          url: 'http://api.weatherstack.com/current' ,
          apiKey: '9e5a9f9fe59c40630263c2edfb6bbc96',
          city: '',
          weather: null,
          selected: ''
      }
    },
    watch:{
      selected(value){
        if(value != ''){
          this.city = value
          this.fetchWeatherData();
          console.log(this.weather.current.temperature > 15)
        }
      }
    },
    methods:{
       async fetchWeatherData(){
          if(this.city == ''){
            alert('unesite u polje naziv mesta')
            return;
          }

          const response = await fetch( `${this.url}?access_key=${this.apiKey}&query=${this.city}`);
        
          this.weather = await response.json()
          if(!response.ok){
            console.log('postoji neka greska');
          }

          console.log(this.weather);
       }
    }
 
}
</script>

<style>
*{
  margin: 0px;
  padding: 0;
  box-sizing: border-box;
}
#app{
  background-image: url('./assets/coldImg.jpg'); 
  background-size: cover;
  /* background-position: bottom; */

}
.warm{
  background-image: url('./assets/imgWeather.jpg')  ; 
   /* background-size: cover; */

}
.title{
  margin: 15px 0px 40px 0px;
  font-size: 50px;
  text-align: center;
}
main{
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(to bottom, rgba(0,0,0, 0.25), rgba(53, 47, 65, 0.25))
}
.overTablet{
  display: none;
}

.search-box{
  width: 100%;
  margin-bottom: 30px;
}
.search-input{
  display: block;
  width: 100%;
  padding: 15px;

  color: black;
  font-size: 20px;

  background: none;
  appearance: none;
  outline: none;
  border: none;

  box-shadow: 0px 0px 6px black;
  background-color:  rgb(178, 178, 178);
  border-radius: 0px 10px 0px 10px;
  transition: 0.5s;
}
.search-input:focus{
  background-color:  rgb(210, 210, 210);
  box-shadow: 0px 0px 15px black;
  border-radius: 0px;
}



.location{
  color: white;
  font-size: 30px;
  text-align: center;
}
.date{
  color: white;
  font-size: 20px;
  text-align: center;
  font-style: italic;
}


.weather-box{
  text-align: center;
}

.weather-box{
  display: flex;
  flex-direction: column;
}

.temp{
  font-size: 50px;
  padding: 40px 40px;
  font-weight: 800;
  color: white;

  text-shadow: 4px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 15px;
  margin: 30px auto;

  box-shadow: 3px 6px  rgba(0, 0, 0, 0.25);
}
.weather{
  color: white;
  font-size: 40px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0,0,0,0.25)
}


@media screen and (min-width: 700px) {
  .search-box{
    width: 40%;
  }

  .overTablet{
    display: block;
    margin-top: 60px;
  }
  
  .allCity{
    padding: 10px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 4px 5px rgb(0 0 0 / 25%);
  }
  .allCity:focus{
     background: rgb(219, 212, 212); 
     border-radius: 15px 15px 0px 0px;
     box-shadow: 3px -4px rgb(0 0 0 / 25%);

  }
  option{
    font-size: 23px;
  }
}

</style>
