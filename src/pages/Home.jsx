import React from 'react'
import Base from '../template/Base'
import '../styles/Home.css'
import { Grid } from '@mui/material'
import Carousel from '../components/Carousel'
import Upnext from '../components/Upnext'
import MovieList from '../components/MovieList'
const Home = () => {
  return (
    <Base>
    <div className="Home_main">
    <Grid style={{ padding:'5% 5%'}} container spacing={6}>

    <Grid  item xs={12} sm={6} md={6}>

<Carousel />

        </Grid>
        <Grid   item xs={12} sm={6} md={6}>

<Upnext />
        </Grid>
    </Grid>

    <div>
      <MovieList />
    </div>


    </div>
    </Base>
  )
}

export default Home