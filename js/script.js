
const OpenWeatherApiKey = '2ac30d75ce21b1db7a1024473dbf52c5';
const pixaBayAPIKey = '30833982-25c2cad9e107e2dd835a21be0';

//MAIN WEATHER SELECTORS

const cityInput = document.querySelector('#city_input');
const searchButton = document.querySelector('#search');
const mainTemperature = document.querySelector('.temperature');
const cityName = document.querySelector('.cityname');
const dateTime = document.querySelector('.date_time');
const weatherStats = document.querySelector('.weather') // rainy, cloudy,
const weatherIcon = document.querySelector('.weather_icon');
const mainContainer = document.querySelector('.container')

//FORECAST SELECTORS

const tres = document.querySelector('#treshoras')
const tresTemp = document.querySelector('#treshoras_temp')
const tresIcon = document.querySelector('#treshoras_icon')
const seis = document.querySelector('#seishoras')
const seisTemp = document.querySelector('#seishoras_temp')
const seisIcon = document.querySelector('#seishoras_icon')
const nove = document.querySelector('#novehoras')
const noveTemp = document.querySelector('#novehoras_temp')
const noveIcon = document.querySelector('#novehoras_icon')
const doze = document.querySelector('#dozehoras')
const dozeTemp = document.querySelector('#dozehoras_temp')
const dozeIcon = document.querySelector('#dozehoras_icon')
const dezoito = document.querySelector('#dezoitohoras')
const dezoitoTemp = document.querySelector('#dezoitohoras_temp')
const dezoitoIcon = document.querySelector('#dezoitohoras_icon')

// TODAY DETAILS

const maxTemp = document.querySelector('#max_temp')
const minTemp = document.querySelector('#min_temp')
const feelsLikeTemp = document.querySelector('#feel_temp')
const skyPercentage = document.querySelector('#sky_percentage')
const humidity = document.querySelector('#humidity_percentage')
const wind = document.querySelector('#wind_speed')
const sunset = document.querySelector('#sunset_time')

// DATAS
const dayHour = new Date ();
const hour = dayHour.getHours();
const minutes = dayHour.getMinutes();
const weekDay = dayHour.getDay();
const day = dayHour.getDate();
const month = dayHour.getMonth();
const year = dayHour.getFullYear();

//DATAS FORECAST
const pegarTresHoras = new Date();
pegarTresHoras.setHours(pegarTresHoras.getHours()+3)
const tresHoras = pegarTresHoras.getHours();

const pegarSeisHoras = new Date();
pegarSeisHoras.setHours(pegarSeisHoras.getHours()+6)
const seisHoras = pegarSeisHoras.getHours();

const pegarNoveHoras = new Date();
pegarNoveHoras.setHours(pegarNoveHoras.getHours()+9)
const noveHoras = pegarNoveHoras.getHours();

const pegarDozeHoras = new Date();
pegarDozeHoras.setHours(pegarDozeHoras.getHours()+12)
const dozeHoras = pegarDozeHoras.getHours();

const pegarDezoitoHoras = new Date();
pegarDezoitoHoras.setHours(pegarDezoitoHoras.getHours()+18)
const dezoitoHoras = pegarDezoitoHoras.getHours();




function pegarMes(mes) {
    if (mes === 0) {
        return 'Jan'
    } else if (mes === 1) {
        return 'Fev'
    } else if (mes === 2) {
        return 'Mar'
    } else if (mes === 3) {
        return 'Abr'
    } else if (mes === 4) {
        return 'Mai'
    } else if (mes === 5) {
        return 'Jun'
    } else if (mes === 6) {
        return 'Jul'
    } else if (mes === 7) {
        return 'Ago'
    } else if (mes === 8) {
        return 'Set'
    } else if (mes === 9) {
        return 'Out'
    } else if (mes === 10) {
        return 'Nov'
    } else if (mes === 11) {
        return 'Dez'
    } 
}

function pegarSemana(diaDaSemana) {
    if (diaDaSemana === 0) {
        return 'Domingo'
    } else if (diaDaSemana === 1) {
        return 'Segunda-Feira'
    } else if (diaDaSemana === 2) {
        return 'Terça-Feira'
    } else if (diaDaSemana === 3) {
        return 'Quarta-Feira'
    } else if (diaDaSemana === 4) {
        return 'Quinta-Feira'
    } else if (diaDaSemana === 5) {
        return 'Sexta-Feira'
    } else if (diaDaSemana === 6) {
        return 'Sábado'
    }
}


//FUNÇÕES

async function getGeoLocation(city) {
    const apiGeoLocationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OpenWeatherApiKey}`;
    const resultado = await fetch(apiGeoLocationURL);
    const data = await resultado.json();

    const latitude = data[0].lat;
    const longitude = data[0].lon;
    return [latitude, longitude];
}


const getWeatherData = async (city) => {
    const geoData = await getGeoLocation(city);
    const latitude = geoData[0];
    const longitude = geoData[1];
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${OpenWeatherApiKey}`
    const resultado = await fetch(apiWeatherURL);
    const weatherData = await resultado.json();
    return weatherData;

    
}

const getForecastData = async (city) => {
    const geoData = await getGeoLocation(city);
    const latitude = geoData[0];
    const longitude = geoData[1];
    const apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${OpenWeatherApiKey}`
    const resultado = await fetch(apiForecastURL);
    const forecastData = await resultado.json();
    return forecastData;
}



const showWeatherData = async (city) => {
    const showWeather = await getWeatherData(city);
    const icon = showWeather.weather[0].icon;
    const descricao = showWeather.weather[0].description;
    const sunsetUnixTime = showWeather.sys.sunset;
    const sunsetTime = new Date(sunsetUnixTime * 1000)
    
    //Insere os dados do tempo na parte principal
    mainTemperature.innerHTML = `${parseInt(showWeather.main.temp)}°`;
    cityName.innerHTML = cityInput.value;
    dateTime.innerHTML = `${zeroEsq(hour)}:${zeroEsq(minutes)} - ${pegarSemana(weekDay)} - ${zeroEsq(day)} ${pegarMes(month)} ${year}`
    weatherStats.innerHTML = descricao;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png">`

    //Detalhes de hoje
    maxTemp.innerHTML = `${parseInt(showWeather.main.temp_max)}°`
    minTemp.innerHTML = `${parseInt(showWeather.main.temp_min)}°`
    feelsLikeTemp.innerHTML = `${parseInt(showWeather.main.feels_like)}°`
    skyPercentage.innerHTML = `${showWeather.clouds.all} %`
    humidity.innerHTML = `${showWeather.main.humidity} %`
    wind.innerHTML = `${showWeather.wind.speed} km/h`
    sunset.innerHTML = `${zeroEsq(sunsetTime.getHours())}:${zeroEsq(sunsetTime.getMinutes())}h`

}


//Mostrar Forecast 

const showForecast = async (city) => {
    const forecast = await getForecastData(city);
    tres.innerHTML = `${tresHoras}H`;
    seis.innerHTML = `${seisHoras}H`;
    nove.innerHTML = `${noveHoras}H`;
    doze.innerHTML = `${dozeHoras}H`;
    iconTres = forecast.list[0].weather[0].icon
    iconSeis = forecast.list[1].weather[0].icon
    iconNove = forecast.list[2].weather[0].icon
    iconDoze = forecast.list[3].weather[0].icon
    iconDezoito = forecast.list[4].weather[0].icon


    dezoito.innerHTML = `${parseInt(dezoitoHoras)}H`;
    tresTemp.innerHTML = `${parseInt(forecast.list[0].main.temp)}°`
    seisTemp.innerHTML = `${parseInt(forecast.list[1].main.temp)}°`
    noveTemp.innerHTML = `${parseInt(forecast.list[2].main.temp)}°`
    dozeTemp.innerHTML = `${parseInt(forecast.list[3].main.temp)}°`
    dezoitoTemp.innerHTML = `${parseInt(forecast.list[4].main.temp)}°`
    tresIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconTres}.png">`
    seisIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconSeis}.png">`
    noveIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconNove}.png">`
    dozeIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconDoze}.png">`
    dezoitoIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconDezoito}.png">`
}



searchButton.addEventListener('click', (ev) => {
    const city = cityInput.value;
    if (city === null || city === ""){
        alert('Insira uma cidade')
        return
    } else {
    ev.preventDefault();
    getWeatherData(city);
    showWeatherData(city);
    showForecast(city);
    pegarBackground(city)
    }
});

cityInput.addEventListener('keyup', (ev) => {
    city = cityInput.value;
    if (ev.keyCode === 13 && (city === "" || city === null)) {
        alert('Insira uma cidade')
    }
    if (ev.keyCode === 13) {
        getWeatherData(city);
        showWeatherData(city);
        showForecast(city);
        pegarBackground(city)
    }
   });

const pegarBackground = async (city) => {
    backgroundlink = `https://pixabay.com/api/?key=${pixaBayAPIKey}&q=${city}&image_type=photo&lang=pt&min_width=600`
    const randInt = numeroRandom(0, 2)
    const resultado = await fetch(backgroundlink);
    const imagens = await resultado.json();
    const imagemURL = imagens.hits[randInt].largeImageURL;
    mainContainer.style.backgroundImage = `url(${imagemURL})`
   }
   
function numeroRandom (min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}

function zeroEsq (num) {
   if (num >= 10) {
    return num
   } else {
        return `0${num}`;
   }
}