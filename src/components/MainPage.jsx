import axios from "axios"
import React, { useEffect, useState } from "react"
import '../App.css'
import Header from "./Header"
import Card from './Card'
import Loader from "./UI/Loader"
import ButtonGenre from "./ButtonGenre"
import { Link } from "react-router-dom"

const MainPage = () => {
  
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [genre, setGenre] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [fetchingScroll, setFetchingScroll] = useState(true)
    const [noScroll, setNoScroll] = useState(false)
    
    const API_KEY = 'RDWW8AC-4ZS4F1T-JPGQJP7-TE1QAHP';
    // const API_KEY = '9SK22QJ-73DMW54-PDMTGZ8-CQDM233';

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.kinopoisk.dev/v1/movie?page=${page}&limit=20${genre}`,{    
          headers: {
            'accept': 'application/json',
            'X-API-KEY': API_KEY
          }}
        )
        .then((response) =>  setMovies(response.data.docs))
        .catch((error) => {setError(true); console.log(error)})
        .finally(() => setLoading(false))
    }, [genre])
    
    useEffect(() => {
      if (fetchingScroll && !noScroll) { 
        axios.get(`https://api.kinopoisk.dev/v1/movie?page=${page}&limit=20${genre}`,{    
          headers: {
            'accept': 'application/json',
            'X-API-KEY': API_KEY
          }}
        )
        .then((response) =>  {setMovies([...movies, ...response.data.docs]); setPage(prevState => prevState+1)})
        .catch((error) => {setError(true); console.log(error)})
        .finally(() => { setFetchingScroll(false)})
      }
    }, [fetchingScroll])

    useEffect(() => {
      
      setLoading(true)
      axios.get(`https://api.kinopoisk.dev/v1/movie?page=1&limit=20${search}`,{    
        headers: {
          'accept': 'application/json',
          'X-API-KEY': API_KEY
        }
      }
      )
        .then((response) =>  setMovies(response.data.docs))
        .catch((error) => {setError(true); console.log(error)})
        .finally(() => setLoading(false))
    }, [search])
    
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
      return function() {
        document.removeEventListener('scroll', scrollHandler)
      }
    }, [])

    const scrollHandler = (e) => {
      if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight) < 300)
      setFetchingScroll(true)
    }

    console.log(noScroll)

    return (
        <div>
          <Header setSearch={setSearch} setNoScroll={setNoScroll} setPage={setPage}/>
          { !loading && !error && movies.length
            ?
            <div className="content">
              <ButtonGenre setGenre={setGenre} setSearch={setSearch} setPage={setPage} setNoScroll={setNoScroll}/>
              <div className="content-list">
                {movies.map((el) => 
                <Link style={{textDecoration:'none', color:'#fff'}}
                  key={el.id} to={`/movie/${el.id}`}>
                  <Card props={el} 
                    key={el.externalId.imdb} 
                  />
                </Link>
                )}
              </div>
          </div>
            : <Loader/> 
          }
      </div>
    )
}

export default MainPage