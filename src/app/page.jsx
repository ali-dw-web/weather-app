'use client'
import { useRef, useState } from "react";
import React from "react";
import { useEffect } from "react";
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import Link from 'next/link'


export default function Main() {
  const [flag, setFlag] = useState(1)
  const [notifi, setNotifi] = useState({
    circle: { right: '2px' },
    main: { background: 'transparent' },
  })

  const [pagination2, setPagination2] = useState({
    temp: 1,
    wind: 1,
    pressure: 1,
    distance: 1,
    notif: 1
  })
  const [weather, setWeather] = useState()
  const [pagination, setPagination] = useState(1)
  const menu = useRef()
  const blur = useRef()
  let timee = new Date()
  const [smallestNo, setSmallestNo] = useState([])
  const [smallestNo2, setSmallestNo2] = useState([])
  const [selected, setSelected] = useState([])
  const [searchedCities, setSerchedCiities] = useState()
  const searchBar = useRef()
  const loading = useRef()
  const error = useRef()
  const [showlessdetails, setShowlessdetails] = useState()
  const loading2 = useRef()
  const [detailsOfMap, setDetailsOfMap] = useState()
  const loading3 = useRef()
  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?
latitude=35.69439&
longitude=51.42151&
hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability&
daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&
current_weather=true&
timezone=auto

`)


      .then(res => res.json())
      .then(data => {

        loading.current.style.display = 'none'
        setWeather(data)


        data.hourly.time.map((val, i) => {
          if (val.substring(11, 13) == timee.getHours()) {

            setSmallestNo(prev => [...prev, i])





          }


        })

      });

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=35.69371&lon= 51.39117&format=json`)
      .then(res => res.json())
      .then(val => {

        setDetailsOfMap(val)

      })

  }, [])


  function loadCities(e) {
    let value = e.target.previousElementSibling.value
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=4`)
      .then(res => res.json())
      .then(val => {

        searchBar.current.style.display = 'block'
        setSerchedCiities(val)
      })


  }
  const weatherText = {
    0: {
      text: "Clear sky",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/clear-day.svg",
    },
    1: {
      text: "Mainly clear",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/partly-cloudy-day.svg",
    },
    2: {
      text: "Partly cloudy",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/partly-cloudy-day.svg",
    },
    3: {
      text: "Overcast",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/cloudy.svg",
    },

    45: {
      text: "Fog",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/fog.svg",
    },
    48: {
      text: "fog",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/fog.svg",
    },

    51: {
      text: " drizzle",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/drizzle.svg",
    },
    53: {
      text: " drizzle",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/drizzle.svg",
    },
    55: {
      text: " drizzle",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/drizzle.svg",
    },

    56: {
      text: "freezing drizzle",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/sleet.svg",
    },
    57: {
      text: "freezing drizzle",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/sleet.svg",
    },

    61: {
      text: "Light rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/rain.svg",
    },
    63: {
      text: "Moderate rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/rain.svg",
    },
    65: {
      text: "Heavy rain",
      icon: "/images/rain.svg",
    },

    66: {
      text: "Light rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/sleet.svg",
    },
    67: {
      text: "Heavy rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/sleet.svg",
    },

    71: {
      text: "Light snow",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/snow.svg",
    },
    73: {
      text: "Moderate snow",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/snow.svg",
    },
    75: {
      text: "Heavy snow",
      icon: "/images/snow.svg",
    },

    77: {
      text: "Snow grains",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/snow.svg",
    },

    80: {
      text: "Light rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/rain.svg",
    },
    81: {
      text: "Moderate rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/rain.svg",
    },
    82: {
      text: "Heavy rain",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/rain.svg",
    },

    85: {
      text: "Light snow",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/snow.svg",
    },
    86: {
      text: "Heavy snow",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/snow.svg",
    },

    95: {
      text: "Thunder",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/thunderstorms.svg",
    },
    96: {
      text: "Thunder",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/thunderstorms.svg",
    },
    99: {
      text: "Thunder",
      icon: "https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/thunderstorms.svg",
    },
  };



  let condition = weather?.current_weather.weathercode
  let _hourlyCondition = weather?.hourly.weathercode[0]
  function slipperup() {
    menu.current.style.left = '10px'
    blur.current.style.display = 'block'


  }
  function slipperdown() {
    blur.current.style.display = 'none'
    menu.current.style.left = '-150px'
  }

  function select(val) {
    loading.current.style.display = 'flex'
    searchBar.current.style.display = 'none'

    fetch(`https://api.open-meteo.com/v1/forecast?
latitude=${val.latitude}&
longitude=${val.longitude}&
hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability&
daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&
current_weather=true&
timezone=auto`)
      .then(res => res.json())
      .then(r => {
        setWeather({
          ...r,
          timezone: val.name
        });
        setPagination(1)
        loading.current.style.display = 'none'
      })

  }

  function removeSearchBar(e) {

    if (e.target.value == '' || e.target.value == null) {
      searchBar.current.style.display = 'none'
    }

  }
  function addToFav(val, e) {
    const totall = []
    let x = val.longitude
    let y = val.latitude

    if (!(selected.length == 0)) {
      selected.map((val) => {
        const go = {
          latitude: val.latitude,
          longitude: val.longitude
        }
        totall.push(go)
      })
      const exists = totall.some(items => items.latitude == y && items.longitude == x)
      if (exists == false) {
        setSelected((prev) => [...prev, val])
      } else {
        error.current.style.right = '1%'
        setTimeout(() => {
          error.current.style.right = '-100%'
        }, 3000);
      }

    } else {
      setSelected((prev) => [...prev, val])
    }



    e.stopPropagation()


  }
  function showMinorDetails(s) {
    loading2.current.style.display = 'flex'
    let longitude = s.longitude
    let latitude = s.latitude

    fetch(`https://api.open-meteo.com/v1/forecast?
latitude=${latitude}&
longitude=${longitude}&
hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability&
daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&
current_weather=true&
timezone=auto`)
      .then(res => res.json())
      .then(val => {
        setShowlessdetails(val)
        loading2.current.style.display = 'none'

        val.hourly.time.map((s, i) => {

          if (s.substring(11, 13) == timee.getHours()) {
            setSmallestNo2((prev) => prev.concat(i))
          }
        })

      })


  }
  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?
latitude=35.6875&
longitude=51.4375&
hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability&
daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&
current_weather=true&
timezone=auto`)
      .then(res => res.json())
      .then(val => {
        setShowlessdetails(val)
        val.hourly.time.map((s, i) => {

          if (s.substring(11, 13) == timee.getHours()) {
            setSmallestNo2((prev) => prev.concat(i))
          }
        })
      })
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=tehran&count=4`)
      .then(res => res.json())
      .then(val => {

        setSelected([val.results[0]])


      })
  }, [])
  const mapRef = useRef();
  const [coords, setCoords] = useState({ lng: '51.404343', lat: '35.715298' });
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });


      initialMap.on('click', function (evt) {
        const clickedCoord = toLonLat(evt.coordinate);
        setCoords({
          lng: clickedCoord[0].toFixed(5),
          lat: clickedCoord[1].toFixed(5),
        });


      });

      setMap(initialMap);
    }
  }, [map]);


  function loadChosenLocation() {
    console.log(coords);

    loading3.current.style.display = 'flex'
    let longitude = ''
    let latitude = ''
    if (coords) {
      longitude = coords.lng
      latitude = coords.lat
    }

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      .then(res => res.json())
      .then(val => {
        console.log(val);
        setDetailsOfMap(val)
        loading3.current.style.display = 'none'
      })

  }
  function checkweather() {
    setPagination(1)
    loading.current.style.display = 'flex'
    let longitude = ''
    let latitude = ''
    if (coords) {
      longitude = coords.lng
      latitude = coords.lat
    }
    fetch(`https://api.open-meteo.com/v1/forecast?
latitude=${latitude}&
longitude=${longitude}&
hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability&
daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&
current_weather=true&
timezone=auto
`)
      .then(res => res.json())
      .then(val => {
        setWeather({
          ...val,
          timezone: detailsOfMap.address.city
        });
        loading.current.style.display = 'none'
        console.log(val);

      })

  }


  function notif() {
    if (flag % 2) {
      setNotifi((prev) => ({
        ...prev,
        circle: { left: '2px' },
        main: { background: '#0095ff' }
      }))
    } else {
      setNotifi((prev) => ({
        ...prev,
        circle: { right: '2px' },
        main: { background: 'transparent' }
      }))
    }
    setFlag(flag + 1)
  }
  return (
    <>
      <section className="w-[full] h-screen  custome-bg flex justify-center items-center">
        <div ref={error} className="fixed top-4 duration-700 right-[-100%] w-full max-w-md bg-[#2a343a] border-l-4 border-red-500 text-white shadow-lg rounded-md overflow-hidden">
          <div className="flex items-start p-4">
            <div className="flex-shrink-0">

              <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="font-semibold">Error</p>
              <p className="mt-1 text-sm">This item was already Selected</p>
            </div>
            <button

              className="ml-4 text-gray-400 hover:text-gray-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div ref={blur} onClick={slipperdown} className="w-[100%] h-[100vh] fixed top-0 right-0 bg-[black]/60 hidden z-40 "></div>
        <div ref={loading} className="w-[100%] h-[100vh] fixed top-0 right-0 bg-[white] z-[10000000] flex justify-center items-center">
          <img className="w-[40px] h-[40px] " src="/images/icons8-loading-circle.gif" alt="" /></div>
        <div ref={menu} className="w-[120px] h-[98%] flex justify-center items-center sm:static fixed z-50 top-[8px] left-[-150px] duration-200">
          <div className="w-[75%] h-[95%] rounded-2xl bg-[#202b2f] ">
            <div className="w-[80%] h-[65px]  rounded-[5px] mt-2 mx-auto text-[55px] text-[white] flex justify-center items-center">
              <img className="w-[45px] h-[45px]" src="https://assets.api.uizard.io/api/cdn/stream/d0bb0968-406e-4014-b9ab-080788e9d44b.png" alt="" />
            </div>
            <div style={pagination == 1 ? { background: '#000e24' } : null} onClick={() => setPagination(1)} className="w-[70%] h-[55px]  rounded-[5px] mt-[70px] duration-300 mx-auto">
              <div style={pagination == 1 ? { color: 'white' } : null} className="w-[100%] h-[50%]  flex justify-center items-center icofont-ui-weather duration-300 text-[#b4b4b4]"></div>
              <div style={pagination == 1 ? { fontWeight: 'bold', color: 'white' } : null} className="w-[100%] text-[12px] text-[#7e8692] h-[50%]  flex justify-center duration-300 items-center">
                weather
              </div>
            </div>
            <div style={pagination == 2 ? { background: '#000e24' } : null} onClick={() => setPagination(2)} className="w-[80%] h-[65px]  rounded-[5px] duration-300 mt-3 mx-auto">
              <div style={pagination == 2 ? { color: 'white' } : null} className="w-[100%] h-[50%]  flex justify-center items-center icofont-settings duration-300 text-[#b4b4b4]"></div>
              <div style={pagination == 2 ? { fontWeight: 'bold', color: 'white' } : null} className="w-[100%] text-[12px] text-[#7e8692] h-[50%]  flex justify-center duration-300 items-center">
                Cities
              </div>
            </div>
            <div style={pagination == 3 ? { background: '#000e24' } : null} onClick={() => setPagination(3)} className="w-[80%] h-[65px] rounded-[5px] mt-3 duration-300 mx-auto">
              <div style={pagination == 3 ? { color: 'white' } : null} className="w-[100%] h-[50%]  flex justify-center items-center icofont-map duration-300 text-[#b4b4b4]"></div>
              <div style={pagination == 3 ? { fontWeight: 'bold', color: 'white' } : null} className="w-[100%] text-[12px] text-[#7e8692]  h-[50%]  flex duration-300 justify-center items-center">
                Map
              </div>
            </div>
            <div style={pagination == 4 ? { background: '#000e24' } : null} onClick={() => setPagination(4)} className="w-[80%] h-[65px]  rounded-[5px] duration-300 mt-3 mx-auto">
              <div style={pagination == 4 ? { color: 'white' } : null} className="w-[100%] h-[50%]  flex justify-center items-center icofont-settings-alt duration-300 text-[#b4b4b4]"></div>
              <div style={pagination == 4 ? { fontWeight: 'bold', color: 'white' } : null} className="w-[100%] text-[12px] text-[#7e8692]  h-[50%]  flex duration-300 justify-center items-center">
                Setting
              </div>
            </div>

          </div>
        </div>
        <div className="w-[95%] h-[98%] flex justify-center items-center">
          <div className="w-[100%] h-[100%] rounded-2xl overflow-hidden">
            <div className="w-[100%] h-[10%] flex justify-start items-center relative">
              <span onClick={slipperup} className=" flex sm:hidden w-[45px] h-[35px] text-[white]  icofont-listine-dots flex justify-center items-center"></span>
              <div className="ml-1.5 text-[13px] lg:w-[60%] w-[100%] h-[80%] outline-0 rounded-xl text-[white] relative ">
                <input onChange={removeSearchBar} placeholder="search for cities" className=" ml-1.5 placeholder:text-[white] text-[13px] bg-[#202b3b] pl-3.5 w-[100%] h-[100%] outline-0 rounded-xl text-[white] " type="text" />
                <span onClick={loadCities} className="absolute top-[50%] active:scale-[0.9] transform translate-y-[-50%] hover:bg-[#141b25] duration-150 right-0 h-[40px] w-[40px] rounded-[50%] flex justify-center items-center icofont-search-map text-[white] text-[20px] font-bold"></span>
                <div ref={searchBar} className="w-[100%] min-h-[100px] absolute top-13 lg:left-2 left-0 flex justify-center flex-wrap items-center bg-[#0b131e]  rounded-xl hidden">{
                  searchedCities?.results ? searchedCities?.results.map((val, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div onClick={() => select(val)} className="w-[100%] border-2 mt-2 h-[100px] bg-[#202b3b] border-[#928e8e] duration-150 hover:border-[#064c81] rounded-2xl flex justify-between items-center">
                          <div className="md:w-[30%] w-[40%] h-[100%]  flex justify-center items-center text-[20px] font-bold text-[#dedfe4]"><span className="icofont-direction-sign"></span>{val.name} / {val.country_code}</div>
                          <div className="md:w-[30%] w-[40%] h-[100%]">
                            <div className="w-[100%] h-[20px] border-b border-[#44424244] text-[#dedfe4] mt-2 font-bold flex justify-center items-center">Country : {val.country}</div>
                            <div className="w-[100%] h-[20px] border-b text-[#dedfe4] font-bold border-[#46434357] mt-2 flex justify-center items-center">Lat : {val.latitude}</div>
                            <div className="w-[100%] h-[20px] border-b text-[#dedfe4] font-bold border-[#36323257] mt-2 flex justify-center items-center">log : {val.longitude}</div>
                          </div>
                          <div className="md:w-[30%] w-[20%] h-[100%] flex justify-center items-center">
                            <div onClick={(e) => addToFav(val, e)} className=" active:scale-[0.9] duration-150 w-[40px] h-[40px] rounded-2xl flex justify-center items-center icofont-plus-circle text-[25px]"></div>
                          </div>
                        </div>
                      </React.Fragment>
                    )

                  }) : 'This city has not been found'
                }</div>
              </div>
            </div>


























            <div style={pagination == 1 ? { display: 'flex' } : { display: 'none' }} className=" overflow-y-scroll scroll-wdith-none flex-wrap lg:justify-between w-[100%] justify-center items-start text-[white] h-[90%]">
              <div className="lg:w-[63%] md:w-[75%] w-[100%] md:h-[100%] h-[100%]">
                <div className=" w-[90%] h-[200px]  rounded-2xl mx-auto flex justify-between items-center">
                  <div className="w-[200px] h-[100%] ">
                    <div className="w-[100%] h-[70px]  flex justify-center items-center font-bold text-[20px] text-[#dde0e4]">{weather?.timezone}</div>
                    <div className="w-[100%] h-[25px]  flex justify-center text-[12px] text-[#dde0e4] items-center">condition : {
                      weatherText[condition]?.text
                    }</div>
                    <div className="w-[100%] font-bold text-[#f0f1f1] h-[100px]  text-[25px] flex justify-center items-center">{weather?.current_weather
                      .temperature}{weather?.current_weather_units
                        .temperature}</div>
                  </div>
                  <div className="w-[180px] h-[100%]  flex justify-center items-center">
                    <img className="w-[100%] h-[100%]" src={weatherText[condition]?.icon} alt="" />
                  </div>
                </div>
                <div className="  md:w-[94%] w-[100%] h-[180px] mx-auto  rounded-2xl bg-[#202b3b]">
                  <div className="w-[100%] h-[20%] text-[10px]  flex text-[#93949c] font-bold pl-4 justify-start items-center">TODAY`S FORECAST ({weather?.daily.time[0]})</div>
                  <div className="w-[90%] h-[80%]   mx-auto flex  space-x-4 py-2 items-center justify-around ">
                    <div className="h-[80%] w-[80px]  ">
                      <div className="w-[100%] h-[25%]  text-[#93949c] flex justify-center items-center text-[13px] font-bold">{
                        (weather?.hourly.time[(smallestNo[0])])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c]  flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[weather?.hourly.weathercode[smallestNo[0]]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          weather?.hourly.temperature_2m[(smallestNo[0])]
                        }{
                          weather?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                    <span className="w-[1px] h-[80%] bg-[#a8a5a588]"></span>
                    <div className="h-[80%] w-[80px]   ">
                      <div className="w-[100%] h-[25%]  text-[#93949c]  flex justify-center items-center text-[13px] font-bold">{
                        (weather?.hourly.time[(smallestNo[0]) + 1])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c]   flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[weather?.hourly.weathercode[(smallestNo[0]) + 1]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          weather?.hourly.temperature_2m[(smallestNo[0] + 1)]
                        }{
                          weather?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                    <span className="w-[1px] h-[80%] bg-[#a8a5a588]"></span>
                    <div className="h-[80%] w-[80px] ">
                      <div className="w-[100%] h-[25%]  text-[#93949c]  flex justify-center items-center text-[13px] font-bold">{
                        (weather?.hourly.time[(smallestNo[0]) + 2])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c] flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[weather?.hourly.weathercode[(smallestNo[0]) + 2]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          weather?.hourly.temperature_2m[(smallestNo[0] + 2)]
                        }{
                          weather?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                    <span className="w-[1px] h-[80%] bg-[#a8a5a588]"></span>
                    <div className="h-[80%] w-[80px]   ">
                      <div className="w-[100%] h-[25%]  text-[#93949c]  flex justify-center items-center text-[13px] font-bold">{
                        (weather?.hourly.time[(smallestNo[0]) + 3])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c] flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[weather?.hourly.weathercode[(smallestNo[0]) + 3]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          weather?.hourly.temperature_2m[(smallestNo[0] + 3)]
                        }{
                          weather?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                    <span className="w-[1px] h-[80%] bg-[#a8a5a588]"></span>

                  </div>
                  <div className="w-[100%] h-[160px] mt-2.5 rounded-2xl bg-[#202b3b] overflow-hidden ">
                    <div className="w-[100%] h-[13%] mt-1.5 text-[10px]  flex justify-start pl-3 font-bold items-center text-[#93949c] ">AIR CONDITIONS</div>
                    <div className="w-[100%] h-[80%] flex justify-around items-center">
                      <div className="w-[230px] h-[100%] ">
                        <div className="w-[100%] h-[50%] ">
                          <div className="w-[100%] h-[50%] flex justify-center items-center ">
                            <span className="icofont-sunny-day-temp text-[#93949c] text-[20px] mr-2 "></span>
                            <span className="font-bold text-[#93949c] text-[15px]">Real Feel</span>
                          </div>
                          <div className="w-[100%] h-[50%] flex justify-center text-[#dedfe4] text-[20px] items-center font-bold">{weather?.current_weather.temperature}{
                            weather?.current_weather_units.temperature}</div>
                        </div>
                        <div className="w-[100%] h-[50%]">
                          <div className="w-[100%] h-[50%] flex justify-center items-center">
                            <span className="icofont-snowy-windy-night text-[#93949c] text-[20px] mr-2 "></span>
                            <span className="font-bold text-[#93949c] text-[15px]">WindDirection</span>
                          </div>
                          <div className="w-[100%] h-[50%] flex justify-center text-[#dedfe4] text-[20px] items-center font-bold">{weather?.current_weather.winddirection}{weather?.current_weather_units.winddirection}</div>
                        </div>
                      </div>
                      <div className="w-[230px] h-[100%]">
                        <div className="w-[100%] h-[50%] ">
                          <div className="w-[100%] h-[50%] flex justify-center items-center">
                            <span className="icofont-wind text-[#93949c] text-[20px] mr-2"></span>
                            <span className="font-bold text-[#93949c] text-[15px]" >wind</span>
                          </div>
                          <div className="w-[100%] h-[50%] flex justify-center text-[#dedfe4] text-[20px] items-center font-bold">{weather?.current_weather.windspeed}{weather?.current_weather_units.windspeed}</div>
                        </div>
                        <div className="w-[100%] h-[50%]">
                          <div className="w-[100%] h-[50%] flex justify-center items-center">
                            <span className="icofont-wind text-[#93949c] text-[20px] mr-2 icofont-direction-sign"></span>
                            <span className="font-bold text-[#93949c] text-[15px]" >TimeZone</span>
                          </div>
                          <div className="w-[100%] h-[50%] flex justify-center text-[#dedfe4] text-[16px] items-center font-bold">{weather?.timezone_abbreviation}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="lg:w-[35%] md:w-[75%] md:h-[100%] h-[80%] w-[100%] flex justify-center items-center ">
                <div className="md:w-[90%] w-[100%] h-[90%] bg-[#202b3b] rounded-2xl">
                  <div className="w-[100%] h-[10%] text-[10px]  flex text-[#93949c] font-bold pl-4 justify-start items-center">
                    7-DAY FORECAST
                  </div>
                  <div className="w-[85%] h-[90%] mx-auto flex justify-center items-center flex-wrap">
                    {weather?.daily.time.map((val, i) => {


                      return (
                        <React.Fragment key={i}>
                          <div className="w-[95%] h-[40px] mx-auto mt-3 flex justify-between items-center">
                            <div className="w-[20%] h-[100%] text-[10px]  flex text-[#93949c] font-bold pl-4 justify-start items-center">{val}</div>
                            <div className="w-[45%] h-[100%]  flex justify-around items-center">
                              <div className=" h-[100%] w-[50%] flex justify-center items-center">
                                <img className="w-[100%] h-[100%]" src={weatherText[weather?.daily.weathercode[i]].icon} alt="" />
                              </div>
                              <div className=" h-[100%] w-[50%] text-[12px] font-bold  flex text-[#d2d2d4] font-bold justify-center items-center">{weatherText[weather?.daily.weathercode[i]].text}</div>
                            </div>
                            <div className="w-[20%] h-[100%] text-[10px]  flex text-[#93949c] font-bold justify-center items-center">
                              {weather?.daily.temperature_2m_max[i]}{weather?.daily_units.temperature_2m_max}/{weather?.daily.temperature_2m_min[i]}{weather?.daily_units.temperature_2m_min}
                            </div>
                          </div>

                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>






































            <div style={pagination == 2 ? { display: 'flex' } : { display: 'none' }} className="w-[100%]  overflow-y-scroll scroll-wdith-none justify-center items-center h-[90%] text-[white]  lg:flex-nowrap flex-wrap">
              <div className="lg:w-[65%] md:w-[80%] w-[100%] sm:w-[90%] h-[100%] overflow-y-scroll scroll-wdith-none">
                {selected.length == 0 ? 'Nothing has been selected' : selected?.map((val, i) => {
                  let index = i + 1
                  return (
                    <React.Fragment key={i}>
                      <div onClick={() => showMinorDetails(val)} className="active:scale-[0.9] w-[100%] max-w-[500px] mt-3.5 mx-auto bg-[#1e293b]  rounded-2xl shadow-lg p-4 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300 ">

                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex justify-center items-center text-white text-xl font-bold">
                          {index}
                        </div>

                        <div className="flex-1 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-center">
                            <h3 className="text-white text-lg font-bold">{val.name} / {val.country_code}</h3>
                            <span className="text-[#94a3b8] text-sm">{val.country}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[#cbd5e1] text-sm">Lat: {val.latitude}</span>
                            <span className="text-[#cbd5e1] text-sm">Lon: {val.longitude}</span>
                          </div>
                        </div>
                      </div>

                    </React.Fragment>
                  )
                })}
              </div>
              <div className="lg:w-[35%] h-[100%] md:w-[80%]  sm:w-[90%] w-[100%]  overflow-y-scroll scroll-wdith-none flex justify-center items-center flex-wrap relative">
                <div ref={loading2} className="w-[95%] h-[100%] bg-[black]/60 absolute top-0 right-0 flex justify-center items-center hidden">
                  <svg
                    className="animate-spin"
                    width="40"
                    height="40"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="90"
                      strokeDashoffset="60"
                    />
                  </svg>

                </div>
                <div className="w-[80%] h-[33.33%]  flex justify-between items-center border-b border-[#706969c0]">
                  <div className="w-[40%] h-[100%] ">
                    <div className="w-[100%] h-[50%]  flex justify-center items-center font-bold text-[20px] text-[#dde0e4]">{showlessdetails?.timezone}</div>
                    <div className="w-[100%]  h-[50%]   flex justify-center items-center font-bold text-[33px] text-[#dde0e4] ">{showlessdetails?.current_weather.temperature}{showlessdetails?.current_weather_units.temperature}</div>
                  </div>
                  <div className="w-[40%] h-[100%] flex justify-center items-center">
                    <img className="w-[70%] h-[70%]" src={weatherText[showlessdetails?.current_weather.weathercode]?.icon} alt="" />
                  </div>
                </div>
                <div className="w-[90%] h-[33.33%]  flex justify-center items-center flex-wrap ">
                  <div className="w-[90%] h-[10%] pl-1  mt-1.5 text-[10px]  flex justify-start  font-bold items-center text-[#93949c] ">
                    TODAY`S FORECAST
                  </div>
                  <div className="w-[33.33%] h-[90%] flex justify-center items-center">
                    <div className="h-[80%] w-[80px]   ">
                      <div className="w-[100%] h-[25%]  text-[#93949c]  flex justify-center items-center text-[13px] font-bold">{
                        (showlessdetails?.hourly.time[(smallestNo2[0])])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c]   flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[showlessdetails?.hourly.weathercode[(smallestNo2[0])]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          showlessdetails?.hourly.temperature_2m[(smallestNo2[0])]
                        }{
                          showlessdetails?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-[33.33%] h-[90%]  flex justify-center items-center ">
                    <div className="h-[80%] w-[80px]   ">
                      <div className="w-[100%] h-[25%]  text-[#93949c]  flex justify-center items-center text-[13px] font-bold">{
                        (showlessdetails?.hourly.time[(smallestNo2[0]) + 1])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c]   flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[showlessdetails?.hourly.weathercode[(smallestNo2[0]) + 1]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          showlessdetails?.hourly.temperature_2m[(smallestNo2[0] + 1)]
                        }{
                          showlessdetails?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-[33.33%] h-[90%]  flex justify-center items-center">
                    <div className="h-[80%] w-[80px]   ">
                      <div className="w-[100%] h-[25%]  text-[#93949c]  flex justify-center items-center text-[13px] font-bold">{
                        (showlessdetails?.hourly.time[(smallestNo2[0]) + 2])?.substring(11, 16)}</div>
                      <div className="w-[100%] h-[50%] text-[#93949c]   flex justify-center items-center">
                        <img className="w-[100%] h-[100%]" src={weatherText[showlessdetails?.hourly.weathercode[(smallestNo2[0]) + 2]]?.icon} alt="" />
                      </div>
                      <div className="w-[100%] text-[#dedee2] font-bold h-[25%] flex justify-center items-center">
                        {
                          showlessdetails?.hourly.temperature_2m[(smallestNo2[0] + 2)]
                        }{
                          showlessdetails?.hourly_units.temperature_2m
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[80%] h-[33.33%] border-t border-[#5c56568e]">
                  <div className="w-[100%] h-[10%]  text-[10px] pl-1  flex text-[#93949c] font-bold  justify-start items-center">3-DAY FORECAST</div>
                  <div className="w-[100%] h-[90%]">

                    {
                      showlessdetails?.daily.time.map((val, i) => {
                        if (i <= 2) {
                          return (
                            <React.Fragment key={i}>
                              <div className="w-[98%] h-[33.33%] mx-auto flex justify-between items-center border-b border-[#6e6c6cb7]">
                                <div className="w-[20%] h-[100%] text-[10px]  flex text-[#93949c] font-bold pl-4 justify-start items-center">{val.substring(5, 13)}</div>
                                <div className="w-[35%] h-[100%]  flex justify-center items-center">
                                  <div className=" h-[100%] flex justify-center items-center">
                                    <img className="w-[100%] h-[100%]" src={weatherText[showlessdetails?.daily.weathercode[i]].icon} alt="" />
                                  </div>
                                  <div className=" h-[100%] text-[12px] font-bold  flex text-[#d2d2d4] font-bold justify-center items-center">{weatherText[showlessdetails?.daily.weathercode[i]].text}</div>
                                </div>
                                <div className="w-[20%] h-[100%] text-[10px]  flex text-[#93949c] font-bold justify-center items-center">
                                  {showlessdetails?.daily.temperature_2m_max[i]}{showlessdetails?.daily_units.temperature_2m_max}/{showlessdetails?.daily.temperature_2m_min[i]}{showlessdetails?.daily_units.temperature_2m_min}
                                </div>
                              </div>
                            </React.Fragment>
                          )
                        }
                      })


                    }

                  </div>
                </div>
              </div>
            </div>
























            <div style={pagination == 3 ? { display: 'flex' } : { display: 'none' }} className="w-[100%] h-[90%] text-[white] lg:flex-nowrap justify-center items-center flex-wrap overflow-y-scroll scroll-wdith-none">
              <div className="w-[100%] md:w-[70%] lg:h-[100%] h-[60%] flex justify-center items-center flex-wrap">
                <div className=" font-bold w-[100%] h-[10%] pl-3.5 flex justify-start items-center text-[#d8d2d2]">SELECT THE LOCATION</div>
                <div className="w-[100%] h-[90%]  flex justify-center items overflow-hidden">
                  <div className="overflow-hidden" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div className="overflow-hidden" ref={mapRef} style={{ width: '100%', height: '100%' }}></div>

                    {coords && (
                      <div className="absolute top-0 left-0 z-0 w-[150px] h-[70px]" style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '8px'
                      }}>
                        Lat: {coords.lat} <br />
                        Lng: {coords.lng}
                      </div>
                    )}
                  </div>
                </div>

              </div>
              <div className="  lg:w-[30%] md:w-[70%] w-[100%] h-[100%] relative">
                <div ref={loading3} className=" hidden w-[100%] h-[100%] bg-[black]/70 absolute top-0 right-0 z-50 flex justify-center items-center">
                  <svg
                    className="animate-spin"
                    width="40"
                    height="40"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="90"
                      strokeDashoffset="60"
                    />
                  </svg></div>
                <div className="w-[100%]  mt-[65px]">
                  <div className="w-[90%] max-w-[350px] mx-auto mt-6 p-5 rounded-2xl bg-[#0f172a] text-white shadow-xl backdrop-blur-xl">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Location Details
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-70">City:</span>
                        <span className="font-medium">{detailsOfMap?.address.city}</span>
                      </div>

                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-70">Country:</span>
                        <span className="font-medium">{detailsOfMap?.address.country}</span>
                      </div>

                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-70">Country Code:</span>
                        <span className="font-medium">{detailsOfMap?.address.country_code}</span>
                      </div>

                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-70">District:</span>
                        <span className="font-medium">{detailsOfMap?.address.district}</span>
                      </div>

                      <div className="flex justify-between border-white/10 pb-2 border-b">
                        <span className="opacity-70">Post Code:</span>
                        <span className="font-medium">{detailsOfMap?.address.postcode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Borough</span>
                        <span className="font-medium">{detailsOfMap?.address.suburb}</span>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="w-[100%] h-[10%] mx-auto flex justify-around items-center">
                  <button onClick={loadChosenLocation} className="w-[90px] h-[40px] text-[10px] font-bold border active:scale-[0.9] duration-200 bg-[#777779] border-[white] rounded-2xl flex  justify-center items-center">
                    load the chosen location
                  </button>
                  <button onClick={checkweather} className="w-[90px] h-[40px] text-[10px] font-bold border active:scale-[0.9] duration-200 bg-[#151558] border-[white] rounded-2xl flex  justify-center items-center">
                    check weather
                  </button>
                </div>
              </div>
            </div>
            <div style={pagination == 4 ? { display: 'block' } : { display: 'none' }} className="w-[100%] h-[90%] text-[white]">
              <div className="w-[100%] h-[100%] flex justify-center items-center lg:flex-nowrap flex-wrap overflow-y-scroll scroll-wdith-none">
                <div className="lg:w-[70%] w-[100%] h-[100%] ">
                  <div className="font-bold w-[100%] h-[10%] pl-3.5 flex justify-start items-center text-[#d8d2d2]">Units</div>
                  <div className="w-[100%] h-[70%] border border-[#00800000] rounded-2xl bg-[#1e293b] flex justify-center it-start flex-wrap">
                    <div className="w-[100%] h-[35px] text-[12px] font-bold w-[100%] h-[10%] pl-3.5 flex justify-start items-center
                     text-[#d8d2d2] ">temerature</div>
                    <div className="w-[95%] h-[35px] text-[#d8d2d2] rounded-xl bg-[#0b131e] mx-auto flex justify-around items-center">
                      <div onClick={() => {
                        setPagination2((prev) => ({ ...prev, temp: 1 }))
                        console.log(weather);

                        let unit = weather?.current_weather_units.temperature
                        if (unit !== '°C') {
                          setWeather(prev => ({
                            ...prev,
                            current_weather_units: {
                              ...prev.current_weather_units,
                              temperature: '°C'
                            },
                            current_weather: {
                              ...prev.current_weather,
                              temperature: (((prev.current_weather.temperature) - 32) * 5 / 9).toFixed(1)
                            },
                            daily_units: {
                              ...prev.daily_units,
                              temperature_2m_max: '°C',
                              temperature_2m_min: '°C'
                            },
                            hourly_units: {
                              ...prev.hourly_units,

                              temperature_2m: '°C'

                            },
                            daily: {
                              ...prev.daily,

                              temperature_2m_max: prev.daily.temperature_2m_max.map(val => ((val - 32) * 5 / 9).toFixed(1)),
                              temperature_2m_min: prev.daily.temperature_2m_min.map(val => ((val - 32) * 5 / 9).toFixed(1))

                            },
                            hourly: {
                              ...prev.hourly,
                              temperature_2m: prev.hourly.temperature_2m.map(val => ((val - 32) * 5 / 9).toFixed(1))

                            }
                          }))
                          setShowlessdetails(prev => ({
                            ...prev,
                            current_weather_units: {
                              ...prev.current_weather_units,
                              temperature: '°C'
                            },
                            current_weather: {
                              ...prev.current_weather,
                              temperature: (((prev.current_weather.temperature) - 32) * 5 / 9).toFixed(1)
                            },
                            daily_units: {
                              ...prev.daily_units,
                              temperature_2m_max: '°C',
                              temperature_2m_min: '°C'
                            },
                            hourly_units: {
                              ...prev.hourly_units,

                              temperature_2m: '°C'

                            },
                            daily: {
                              ...prev.daily,

                              temperature_2m_max: prev.daily.temperature_2m_max.map(val => ((val - 32) * 5 / 9).toFixed(1)),
                              temperature_2m_min: prev.daily.temperature_2m_min.map(val => ((val - 32) * 5 / 9).toFixed(1))

                            },
                            hourly: {
                              ...prev.hourly,
                              temperature_2m: prev.hourly.temperature_2m.map(val => ((val - 32) * 5 / 9).toFixed(1))

                            }
                          }))



                        }






                      }} style={pagination2.temp == 1 ? { background: '#35455e' } : null} className="w-[49%] h-[80%] text-[#d8d2d2] rounded-lg flex justify-center items-center text-[12px]">Celsius</div>
                      <span className="w-[1px] h-[80%] bg-[#4e4d4da6]"></span>
                      <div onClick={() => {
                        setPagination2((prev) => ({ ...prev, temp: 2 }))
                        console.log(weather);
                        let unit = weather?.current_weather_units.temperature
                        if (unit !== '°F') {
                          setWeather(prev => ({
                            ...prev,
                            current_weather_units: {
                              ...prev.current_weather_units,
                              temperature: '°F'
                            },
                            current_weather: {
                              ...prev.current_weather,
                              temperature: (((prev.current_weather.temperature) * 9 / 5) + 32).toFixed(1)
                            },
                            daily_units: {
                              ...prev.daily_units,
                              temperature_2m_max: '°F',
                              temperature_2m_min: '°F'
                            },
                            hourly_units: {
                              ...prev.hourly_units,

                              temperature_2m: '°F'



                            },
                            daily: {
                              ...prev.daily,

                              temperature_2m_max: prev.daily.temperature_2m_max.map(val => ((val * 9 / 5) + 32).toFixed(1))
                              ,
                              temperature_2m_min: prev.daily.temperature_2m_min.map(val => ((val * 9 / 5) + 32).toFixed(1))

                            },
                            hourly: {
                              ...prev.hourly,
                              temperature_2m: prev.hourly.temperature_2m.map(val => ((val * 9 / 5) + 32).toFixed(1))

                            }
                          }))
                          setShowlessdetails(prev => ({
                            ...prev,
                            current_weather_units: {
                              ...prev.current_weather_units,
                              temperature: '°F'
                            },
                            current_weather: {
                              ...prev.current_weather,
                              temperature: (((prev.current_weather.temperature) * 9 / 5) + 32).toFixed(1)
                            },
                            daily_units: {
                              ...prev.daily_units,
                              temperature_2m_max: '°F',
                              temperature_2m_min: '°F'
                            },
                            hourly_units: {
                              ...prev.hourly_units,

                              temperature_2m: '°F'



                            },
                            daily: {
                              ...prev.daily,

                              temperature_2m_max: prev.daily.temperature_2m_max.map(val => ((val * 9 / 5) + 32).toFixed(1))
                              ,
                              temperature_2m_min: prev.daily.temperature_2m_min.map(val => ((val * 9 / 5) + 32).toFixed(1))

                            },
                            hourly: {
                              ...prev.hourly,
                              temperature_2m: prev.hourly.temperature_2m.map(val => ((val * 9 / 5) + 32).toFixed(1))

                            }
                          }))


                        }

                      }} style={pagination2.temp == 2 ? { background: '#35455e' } : null}
                        className="w-[49%] h-[80%] text-[12px] rounded-lg flex justify-center items-center">Fahrenheit</div>
                    </div>
                    <div className=" mt-7 w-[100%] h-[35px] text-[12px] font-bold w-[100%] h-[10%] pl-3.5 flex justify-start items-center
                     text-[#d8d2d2]">windSpeed</div>
                    <div className="w-[95%] h-[35px] text-[#d8d2d2] rounded-xl bg-[#0b131e] mx-auto flex justify-around items-center">
                      <div onClick={() => {
                        setPagination2((prev) => ({ ...prev, wind: 1 }))
                        let unit = weather?.current_weather_units.windspeed
                        console.log(unit);

                        if (unit !== 'km/h') {
                          setWeather((prev) => ({
                            ...prev,
                            current_weather_units: {
                              ...prev.current_weather_units,
                              windspeed: 'km/h'
                            },
                            current_weather: {
                              ...prev.current_weather,
                              windspeed: ((prev.current_weather.windspeed) * 3.6).toFixed(1)
                            }

                          }))
                        }
                      }
                      } style={pagination2.wind == 1 ? { background: '#35455e' } : null} className="w-[49%] h-[80%] text-[#d8d2d2] rounded-lg flex justify-center items-center text-[12px]">Km/h</div>
                      <span className="w-[1px] h-[80%] bg-[#4e4d4da6]"></span>
                      <div onClick={() => {
                        setPagination2((prev) => ({ ...prev, wind: 2 }))
                        let unit = weather?.current_weather_units.windspeed
                        console.log(unit);

                        if (unit !== 'm/s') {
                          setWeather((prev) => ({
                            ...prev,
                            current_weather_units: {
                              ...prev.current_weather_units,
                              windspeed: 'm/s'
                            },
                            current_weather: {
                              ...prev.current_weather,
                              windspeed: ((prev.current_weather.windspeed) / 3.6).toFixed(1)
                            }

                          }))
                        }
                      }} style={pagination2.wind == 2 ? { background: '#35455e' } : null}
                        className="w-[49%] h-[80%] text-[12px] rounded-lg flex justify-center items-center">m/s</div>
                    </div>
                    <div className="w-[100%] h-[35px] text-[12px] font-bold w-[100%] h-[10%] pl-3.5 flex justify-start items-center
                     text-[#d8d2d2] mt-7">pressure</div>
                    <div className="w-[95%] h-[35px] text-[#d8d2d2] rounded-xl bg-[#0b131e] mx-auto flex justify-around items-center">
                      <div onClick={() => setPagination2((prev) => ({ ...prev, pressure: 1 }))

                      } style={pagination2.pressure == 1 ? { background: '#35455e' } : null} className="w-[49%] h-[80%] text-[#d8d2d2] rounded-lg flex justify-center items-center text-[12px] ml-1">mm</div>
                      <span className="w-[1px] h-[80%] bg-[#4e4d4da6]"></span>
                      <div onClick={() => setPagination2((prev) => ({ ...prev, pressure: 2 }))
                      } style={pagination2.pressure == 2 ? { background: '#35455e' } : null} className="w-[49%] h-[80%] text-[#d8d2d2] rounded-lg flex justify-center items-center text-[12px]">hPk</div>
                      <span className="w-[1px] h-[80%] bg-[#4e4d4da6]"></span>
                      <div onClick={() => setPagination2((prev) => ({ ...prev, pressure: 3 }))} style={pagination2.pressure == 3 ? { background: '#35455e' } : null}
                        className="w-[49%] h-[80%] text-[12px] rounded-lg flex justify-center items-center mr-1">kPa</div>
                    </div>
                  </div>
                  <div className="w-[100%] h-[15%] rounded-2xl mt-2 bg-[#1e293b] flex justify-center items-center">
                    <div className="w-[50%] h-[100%] flex flex-col justify-center items-center">
                      <div className="w-[100%] h-[25px] pl-5 text-[#e9e2e2] text-[15px] font-bold">Notifications</div>
                      <div className="w-[100%] h-[25px] pl-5 text-[12px] ">Be aware of the weather </div>
                    </div>
                    <div className="w-[50%] h-[100%] flex justify-end items-center pr-[30px]" >
                      <div onClick={notif} style={notifi.main} className="w-[45px] duration-300  h-[25px] border border-[white] rounded-2xl relative">
                        <div style={notifi.circle} className="w-[50%] h-[90%] rounded-[50%] absolute duration-150  bg-[white] top-[50%] transform translate-y-[-50%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[30%] w-[100%] h-[100%]  flex justify-center items-center">
                  <div className="w-[90%] h-[350px] bg-[#1e293b]  rounded-2xl">
                    <div className="w-[100%] h-[120px] flex justify-center items-center">
                      <img className=" object-cover w-[100px] h-[100px] rounded-[50%]" src="/images/profi.jfif" alt="" />
                    </div>
                    <div className="w-[100%] h-[50px]  flex justify-center items-center">
                      <div className="w-[45%] h-[100%] flex justify-center items-center font-bold text-[#a19d9d] border-b border-[#4e4e4e] ">Designer</div> <span className="w-[1px] h-[50%] bg-[gray]"></span>
                      <div className=" border-b border-[#4e4e4e] w-[45%] h-[100%] flex justify-center items-center font-bold text-[#a09e9e]">Ali Salimi</div>
                    </div>
                    <div className="w-[100%] h-[50px]  flex justify-center items-center">
                      <div className="w-[45%] h-[100%] flex justify-center items-center font-bold text-[#a19d9d] border-b border-[#4e4e4e] ">
                        <span className=" text-[25px] icofont-mobile-phone"></span> <span className="font-bold text-[#a19d9d]">mobile</span>
                      </div> <span className="w-[1px] h-[50%] bg-[gray]"></span>
                      <div className=" border-b border-[#4e4e4e] w-[45%] h-[100%] flex justify-center items-center text-[#a09e9e]">09104578437</div>
                    </div>
                    <div className="w-[100%] h-[50px]  flex justify-center items-center">
                      <div className="w-[45%] h-[100%] flex justify-center items-center font-bold text-[#a19d9d] border-b border-[#4e4e4e] ">
                        <span className=" text-[25px] icofont-github"></span> <span className="font-bold text-[#a19d9d]">GitHub</span>
                      </div> <span className="w-[1px] h-[50%] bg-[gray]"></span>
                      <div className=" border-b border-[#4e4e4e] w-[45%] h-[100%] flex justify-center items-center text-[#a09e9e]">
                        <Link target="_blank" className="hover:font-bold" href={'#'}>click</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}