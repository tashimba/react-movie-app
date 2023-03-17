import React from 'react'
import '../App.css'

const Card = ({setShowMovie,...props}) => {
  return (
    <div> 
        <div className="card">
            { props.props.poster &&
            <img style={{height:'280px'}} src={props.props.poster.url} alt="cardimg"/>
              
            }
              <div className="card-title">
                {props.props.name}
              </div>
            <div className="card-grade">
              <div className="card-grade-content">
                <img src="src/images/iconStar.png" alt="star"/>
                <div>{props.props.rating.imdb}</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Card