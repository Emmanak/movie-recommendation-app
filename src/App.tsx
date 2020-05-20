import React from 'react';
import './App.css';
import MovieList from './components/movieList';
import NavBar from "./components/navbar";


export interface AppProps {
  
}
 
export interface AppState {
  movieList: Array<any>
  
}
 
class App extends React.Component<AppProps, AppState> {
  state = { movieList: []  }
  componentDidMount(){
    this.getMovies();
  }
  componentWillUnmount(){

  }
  render() {
    return ( 
      <React.Fragment>
      <div id='navbar'>
          <NavBar search={this.search}/>
      </div>
      <div id='movieList' className="container">
        <MovieList movieList={this.state.movieList}/>
      </div>
    </React.Fragment>
     );
  }

  getMovies = () =>{
    
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

  search = () => {
    var search = document.getElementById("movieSearchBox")?.textContent;
    console.log(search);
  }


}
 
export default App;
