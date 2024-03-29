import React, { useEffect, useState } from 'react';
import '../styles/Upnext.css';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, List, ListItem, ListItemText, Typography } from '@mui/material';

const image_url = 'https://image.tmdb.org/t/p/original';

const Upnext = () => {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [next, setNext] = useState([]);

  useEffect(() => {
    const nextFetch = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=a92727b2b809edeb2a0d5b0566cc5732&language=en-US&page=1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setNext(data.results);
        console.log(next);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    nextFetch();
  }, []);

  const Demo = styled('div')(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper,
  }));


  return (
    <>
    <h3 className='upnext_title'>UP NEXT</h3>

    <div className='upnext_main'>
      <Demo className='list'>
        <div className="scroll_wrapper">
          <List dense={dense}>
            {next.map((data, idx) => (
              <Card key={idx} sx={{ display: 'flex', maxWidth:'50%', margin:'0 auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {data.release_date}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={`${image_url}${data.poster_path}`}
                    alt="Movie Poster"
                  />
                </Box>
              </Card>
            ))}
          </List>
        </div>
      </Demo>
    </div>
    </>
  );
};

export default Upnext;
