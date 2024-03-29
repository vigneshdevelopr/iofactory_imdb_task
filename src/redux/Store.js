import { configureStore } from '@reduxjs/toolkit'

import Auth from '../redux/auth.jsx'
import movieReducer from '../redux/movieslice.js'

const Store = configureStore({
    reducer:{
        auth: Auth,
        movies: movieReducer


    }
})

export default Store