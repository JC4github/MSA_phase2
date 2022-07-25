
import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';
import { Box, Button, Grid, IconButton, Paper, Skeleton } from "@mui/material";
import {borders} from "@mui/system";

function App() {

    const [animeData, setAnimeData] = useState<undefined | any>(undefined);
    const [animeName, setAnimeName] = useState("");

    const ANIME_BASE_URL = "https://api.jikan.moe/v4/anime?q="
  return (
    <div style={{backgroundColor: '#d9fffc', height: '100vh', top: 0, bottom: 0}}>
      
      <div className="search-field">
        <h1 style={{textAlign: "center", marginTop: 0, paddingTop: '70px'}}>Anime Search</h1>
        <div style={{display: "flex", justifyContent: "center"}}>
          <TextField
            id="search-bar"
            className='text'
            value={animeName}
            onChange={(prop: any) => {
              setAnimeName(prop.target.value);
            }}
            label='Enter a anime name'
            variant='outlined'
            placeholder='Search...'
            size='small'
            />
          <IconButton
            aria-label="search"
            onClick={()=>{
              search();
            }}
          >
            <SearchIcon style={{fill:'blue'}}/> Search
          </IconButton>
        </div>
      </div>   
      
      <div style={{display: "flex", justifyContent: "center"}}>
          {animeData === undefined ? (
            <p>Anime not found</p>
          ) : (
            <div style={{textAlign: "center"}}>
              <Paper sx={{ backgroundColor: "grey", padding: '20px', marginTop: '20px'}}>
                <Grid
                  container
                  direction="row"
                  spacing={5}
                  sx={{justifyContent: "center"}}
                >
                  <Grid item>
                    <Box>
                      <img src={getAnimeImg()?.toString()} alt="somethings broken" />
                    </Box>
                  </Grid>
                  <Grid item>
                    <h2 style={{marginTop: 0, textAlign: 'left'}}>{getAnime()?.toString()}</h2>
                    <div  style={{width: 500}}>
                      <Box component="div" sx={{whiteSpace: 'normal', border: 1, borderRadius: '5px', textAlign: 'left', padding: '5px'}}>
                        {getAnimeDesc()?.toString()}
                      </Box>
                    </div>
                  </Grid>
              </Grid>
            </Paper>
          </div>
          )}
    </div>
    </div>
  );

  function search() {
  axios
    .get(ANIME_BASE_URL + animeName.toLowerCase() + "&limit=1")
    .then((res) => {
      setAnimeData(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log("anime not found");
      setAnimeData(undefined);
    });
  }

  function getAnime() {
    return animeData.data.map((item: any) => item.title); 
  }

  function getAnimeImg() {
    return animeData.data.map((item: any) => item.images.jpg.image_url); //issue need fix; index json array
  }

  function getAnimeDesc() {
    return animeData.data.map((item: any) => item.synopsis); //issue need fix; index json array
  }
}

export default App;
