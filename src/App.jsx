import { useState } from 'react'

import './App.css'
import Theme from './components/Theme'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'


function App() {
  return (
    <>
    
      <Theme/>
      <CurrentWeather/>
      <Forecast/>
    
    </>
  )
}

export default App
