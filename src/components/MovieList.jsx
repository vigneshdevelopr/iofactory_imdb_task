import React, { useEffect, useState } from 'react';
import '../styles/MovieList.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieslice';
const image_url = 'https://image.tmdb.org/t/p/original'

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const status = useSelector(state => state.movies.status);
  const error = useSelector(state => state.movies.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, status]);

  useEffect(() => {
    if (status === 'succeeded') {
      setTotalPages(Math.ceil(movies.total_pages));
    }
  }, [movies, status]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='movieCards'>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <>
          {movies.map((movieResults, idx) => (
            <Card key={idx} sx={{ maxWidth: 345, cursor: 'pointer' }}>
              <CardMedia
                sx={{ height: 440 }}
                image={`${image_url}${movieResults.poster_path}`}
                title={movieResults.title}
              />
              <CardContent>
                <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
                  {movieResults.title}
                </Typography>
                <Typography sx={{ maxHeight: '4rem', display: 'block', overflow: 'hidden' }} variant="body2" color="text.secondary">
                  {movieResults.overview}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Share</Button>
                <Button size="small">Learn More</Button> */}
              </CardActions>
            </Card>
          ))}
          <div className="pagination">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
            <span>{currentPage} of {totalPages}</span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
