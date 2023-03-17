import React, { useState } from "react"
import { Link } from "react-router-dom"
import '../App.css'

const Header = ({setSearch, setNoScroll, setPage}) => {

const [searchValue, setSearchValue] = useState('')

const submitSearch = (e) => {
  e.preventDefault()
  setSearch(`&name=${searchValue}`)
  setNoScroll(true)
  setPage(1)
  setSearchValue('')
}

  return (
    <div>
    <header>
    <Link 
      onClick = {() => {setSearch(false); setNoScroll(false)}}
      style={{textDecoration:'none'}}
      to={'/'}>
      <div>
        <div className='header-logo-brend'>
        <img src='/src/images/icon.png'
          className="header-logo"></img>
            <h1 style={{color: '#fff'}}>Moviepoisk</h1>
        </div>
      </div>
    </Link>
    { setSearch &&
      <form className='header-form'
          onSubmit={(e) => submitSearch(e)}
        >
          <input className='search'
              type="text"
              placeholder='Search Movies or TV shows'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              />
        </form>
    }
        
    </header>
    </div>
  )
}

export default Header