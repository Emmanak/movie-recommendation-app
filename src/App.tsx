import React from 'react';
import './App.css';
import MovieList from './components/movieList';
import NavBar from "./components/navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import YourMovies from './components/yourmovies';



export interface AppProps {
  
}
 
export interface AppState {
  movieList: Array<any>,
  searchQuery: string,
  searchList: Array<any>
  
}
 
class App extends React.Component<AppProps, AppState> {

  state = { 
    movieList: [],
    searchQuery: '',
    searchList: []
    }


  componentDidMount(){
    this.getPopularMovies();
  }
  componentWillUnmount(){

  }


  render() {

    //Used to send props with MovieList Component in react-router
    const passMovieList = () => {
      return(
        <MovieList movieList={this.state.movieList}/>
      );
    }

    //Pass YourMovies component to react-router
    const passYourMovies = () => {
      if(this.state.searchQuery === ''){
        return(
          <YourMovies></YourMovies>
        );
      }
      else{
        return(
          <MovieList movieList={this.state.movieList}/>
        );
      }
      
    }

    

    return ( 
      <React.Fragment>
      <div id='navbar'>
          <NavBar handleChange={this.readInput}/>
      </div>
      <Router>
        <Switch>
          <Route path="/" exact component={passMovieList}></Route>
          <Route path="/home" exact component={passMovieList}></Route>
          <Route path="/trending" exact component={passMovieList}></Route>
          <Route path="/your-movies" exact component={passYourMovies}></Route>
        </Switch>
      </Router>
      
      
    </React.Fragment>
     );
  }

  getPopularMovies = () =>{
    if(this.state.searchQuery === ''){
      //get current popular movies from the database
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=1')
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url
        this.setState({movieList: jsonData.results, searchList: jsonData.results});
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    }
    
  }

  

  readInput = (event:any) => {
    if(event.target.value === ''){
      this.setState({movieList: this.state.searchList});
      return;
    }
    //search database for movies based on user input
    var searchQuery = event.target.value.replace(/ /g,"+");
    fetch('https://api.themoviedb.org/3/search/movie?api_key=04c67358ca6817bcec69c61716577d76&query='+searchQuery)
    .then(response => response.json())
    .then(jsonData => {
      // jsonData is parsed json object received from url
      console.log(jsonData.results);
      this.setState({movieList: jsonData.results});
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
    this.setState({searchQuery: event.target.value});
    console.log(this.state.searchQuery);
  }


}
 
export default App;
