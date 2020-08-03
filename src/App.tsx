import React,{useEffect, useState} from 'react';
import './App.css';
import {getPopularMovies} from './components/getpopularmovies';
import MovieApp from './components/movieApp';




export interface AppProps {
  
}
 
const App: React.SFC<AppProps> = () => {

  const [discoverPage, setDiscoverPage] = useState([]);

  useEffect(() => {
    getPopularMovies(setDiscoverPage);
  }, []);
  
  console.log(discoverPage);
  return ( 
    <MovieApp setDiscoverPage={setDiscoverPage} discoverPage={discoverPage}></MovieApp>
   );
}
 
export default App;
