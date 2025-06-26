import { useState } from 'react'

import './App.css'
import Theme from './components/Theme'
import CurrentWeather from './components/CurrentWeather'
import fetchCityImage from './services/fetchCityImage'


function App() {
  fetchCityImage()
  return (
    <>
    
      <Theme/>
      <CurrentWeather/>
      
    
    </>
  )
}

export default App
