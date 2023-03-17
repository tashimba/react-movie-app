import React from 'react'
import '../App.css'

const ButtonGenre = ({setGenre, setPage, setSearch, setNoScrol}) => {
  const cleanPageSearch = () => {
    setPage(1)
    setSearch('')
    setNoScrol(false)
  }
  return (
    <div>
        <div className="switch-sort">
              <button 
                className="switch-sort-btn"
                onClick={() => {setGenre("All"); cleanPageSearch()}}
              >
                All</button>
              <button 
                className="switch-sort-btn"
                onClick={() => {setGenre("&type=movie"); cleanPageSearch()}}
              >
                Movies</button>
              <button 
                className="switch-sort-btn"
                onClick={() => {setGenre("&type=tv-series"); cleanPageSearch()}}
              >
                TV-series</button>
                <button 
                className="switch-sort-btn"
                onClick={() => {setGenre("&type=cartoon "); cleanPageSearch()}}
              >
                Cartoon </button>
                <button 
                className="switch-sort-btn"
                onClick={() => {setGenre("&type=anime "); cleanPageSearch()}}
              >
                Anime </button>
          </div>
    </div>
  )
}

export default ButtonGenre