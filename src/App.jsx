import React from "react"
import { Route, Routes } from "react-router-dom"
import './App.css'
import MovieInfo from "./components/MovieInfo"
import MainPage from "./components/MainPage"
 

function App() {
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/movie/:id" element={<MovieInfo/>}/>
      </Routes>
    </div>
  )
}

export default App
