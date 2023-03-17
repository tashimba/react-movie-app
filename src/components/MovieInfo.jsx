import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from './UI/Loader';

const MovieInfo = () => {
    const {id} = useParams();
    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const API_KEY = 'RDWW8AC-4ZS4F1T-JPGQJP7-TE1QAHP';
    // const API_KEY = '9SK22QJ-73DMW54-PDMTGZ8-CQDM233';

    useEffect(() => {
        axios.get(`https://api.kinopoisk.dev/v1/movie?page=1&limit=10&id=${id}`,{    
          headers: {
            'accept': 'application/json',
            'X-API-KEY': API_KEY
          }
        }
        )
          .then((response) =>  setData(response.data.docs[0]))
          .catch(() => {setError(true); console.log(error)})
          .finally(() => setLoading(false))
      }, [])
    console.log(data)

  return (
    <div>
        <Header/>
        {!loading && !error
        ?
            <div className='movie-info'>
                <div className="movie-info-main">
                    <img className='movie-info-poster' src={data.poster.url} alt="movie logo"/>
                    <div className="movie-info-main-text">
                        <h1 className="movie-name">{data.name}</h1>
                        {/* <h2 className="movie-alt-name">{data.alternativeName}</h2> */}
                        <p className="description">
                        {data.description}
                        </p>
                        <div className="card-grade-content movie-rating">
                            <img className='movie-rating-icon' src="/src/images/iconStar.png" alt="star"/>
                            <div>{data.rating.imdb}</div>
                        </div>
                        <div className="movie-info-point release-date">
                            <div className="type-info">Дата выхода:</div>
                            <div className="info">{data.year}</div>
                        </div>
                        <div className="movie-info-point run-time">
                            <div className="type-info">Продолжительность:</div>
                            <div className="info">{data.movieLength} минуты</div>
                        </div>
                        <div className="movie-info-point genre">
                            <div className="type-info">Жанр:</div>
                            <div 
                            className="info">{data.genres.map((el) => 
                                el.name+', ')}
                                </div>
                        </div>
                        {data.watchability.items &&
                        <div className="movie-info-point watch">
                            <div className="type-info">Смотреть:</div>
                            <div className="info-watch-urls">
                                {data.watchability.items.slice(0,5).map((el, index) => 
                                    <a key={index} href={el.url}>
                                        <img style={{width:'60px', borderRadius:'8px'}}
                                            src={el.logo.url} alt="Иви" 
                                            key={el.name}
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        : <Loader/>
        }    
    </div>
  )
}

export default MovieInfo