
import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';
import { Box, Button, Grid, IconButton, Paper, Skeleton } from "@mui/material";

function App() {

    const [animeData, setAnimeData] = useState<undefined | any>(undefined);
    const [animeName, setAnimeName] = useState("");

    const ANIME_BASE_URL = "https://api.jikan.moe/v4/anime?q="
  return (
    <div>
      <h1>Anime Search</h1>
      <div>
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
          <SearchIcon style={{fill:'blue'}}/>
        </IconButton>

        {animeData === undefined ? (
          <p>Anime not found</p>
        ) : (
          <div>
            <h4>{getAnime()?.toString()}</h4>
            <img src={getAnimeImg()?.toString()} alt="somethings broken" />
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
}

export default App;
