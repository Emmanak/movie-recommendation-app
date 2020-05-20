import React from 'react';
import './App.css';
import MovieList from './components/movieList';
import NavBar from "./components/navbar";


export interface AppProps {
  
}
 
export interface AppState {
  movieList: Array<any>,
  searchQuery: string
  
}
 
class App extends React.Component<AppProps, AppState> {
  state = { 
    movieList: [],
    searchQuery: ''
    }
  componentDidMount(){
    this.getPopularMovies();
  }
  componentWillUnmount(){

  }
  render() {
    return ( 
      <React.Fragment>
      <div id='navbar'>
          <NavBar handleChange={this.readInput} search={this.searchMovies}/>
      </div>
      <div id='movieList' className="container">
        <MovieList movieList={this.state.movieList}/>
      </div>
    </React.Fragment>
     );
  }

  getPopularMovies = () =>{
    
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=1')
    .then(response => response.json())
    .then(jsonData => {
      // jsonData is parsed json object received from url
      this.setState({movieList: jsonData.results});
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
  } 

  searchMovies = () => {
    var searchQuery = this.state.searchQuery.replace(/ /g,"+");
    console.log(searchQuery);
    fetch('https://api.themoviedb.org/3/search/movie?api_key=04c67358ca6817bcec69c61716577d76&query='+searchQuery)
    .then(response => response.json())
    .then(jsonData => {
      // jsonData is parsed json object received from url
      this.setState({movieList: jsonData.results});
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })

  }

  readInput = (event:any) => {
    this.setState({searchQuery: event.target.value});
  }


}
 
export default App;
