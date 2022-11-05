import {useEffect, useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";

function App() {
  const [movies,setMovies]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const [favourites,setFavourites]=useState("")


  const getMoviesRequest= async (searchValue)=>{
    const url=`http://www.omdbapi.com/?s=star wars&apikey=372d8f11`;

    const response= await fetch(url);
    const responseJson=await response.json();

    if(responseJson.search){
      setMovies(responseJson.Search)
    }
    console.log(responseJson);
  };
  useEffect(()=>{
    getMoviesRequest(searchValue);
  },[searchValue]);

  const addFavouriteMovie=(movie)=>{
    const newFavouriteList=[...favourites,movie]
    setFavourites(newFavouriteList)
  }

  return (
    // <div>hello world</div>
   
   <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4" >
      <MovieListHeading heading="Movies"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
    <MovieList movies ={movies} handleFavouritesClick={addFavouriteMovie}favouriteComponent={AddFavourites}/> 
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4" >
      <MovieListHeading heading="Favourites"/>
    </div>
    <div className="row">
    <MovieList movies ={movies} handleFavouritesClick={addFavouriteMovie}favouriteComponent={AddFavourites}/> 
    </div>

   </div>
      
  
  )
}

export default App;
