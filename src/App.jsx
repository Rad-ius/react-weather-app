import { useState } from 'react'

import './App.css'
import Theme from './components/Theme'
import CurrentWeather from './components/CurrentWeather'
import fetchUserTimeZone from './services/fetchUserTimeZone'
import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';


function App() {
  fetchUserTimeZone()
  return (
    <>
    
      <Theme/>
      <CurrentWeather/>
      
    
    </>
  )
}

export default App
