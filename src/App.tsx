import React from 'react';
import './App.css';
import MovieList from './components/movieList';
import NavBar from "./components/navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import YourMovies from './components/yourmovies';
import {db} from './fbconfig';



export interface AppProps {
  
}
 
export interface AppState {
  movieList: Array<any>,
  searchQuery: string,
  searchList: Array<any>,
  userData: Array<any>,
  userMovies: Array<any>
  
}
 
class App extends React.Component<AppProps, AppState> {

  state = { 
    movieList: [],
    searchQuery: '',
    searchList: [],
    userData: [],
    userMovies: []
    }


  componentDidMount(){
    this.getPopularMovies();
    this.readFromFirebase();
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
          <YourMovies 
          userData={this.state.userData}
          userMovies={this.state.userMovies}></YourMovies>
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
    const query = {
      popular: 'https://api.themoviedb.org/3/movie/popular?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=',
      trending: 'https://api.themoviedb.org/3/trending/all/day?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=',
      multi: 'https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query=family'
    }
    var page : string = Math.round(Math.random() * 10).toString();
    if(this.state.searchQuery === ''){
      //get current popular movies from the database
      fetch(query.trending + page)
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
    fetch('https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query='+searchQuery)
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

  
  readFromFirebase(){
    //read document from emmanuel-augustine/movie-recommendation-app
    db.collection("emmanuel-augustine").doc("movie-recommendation-app").get()
    .then( (movies) => {
        if(movies.exists){

            //make JSON into an array to make it iterable.
            var userData:any = Object.assign([], movies.data());
            console.log("Movies successfully read to Firebase!");
            console.log(userData);

            //store user Data
            this.setState({userData: userData})

            //query movie Database
            this.readFromTMDB(userData);

        }else{
            console.log("No data found");
        }
        
    })
    .catch(function(error:any) {
        console.error("Error writing document to Firebase: ", error);
    });
}

//Query movie Data from TMDB
readFromTMDB(movies:Array<any>){
        
var promises = [];
for(var i = 0; i < movies.length; i++){
    promises.push(fetch("https://api.themoviedb.org/3/movie/"+movies[i].id+"?api_key=04c67358ca6817bcec69c61716577d76&language=en-US").then(response => response.json())
    .then(jsonData => {
        //Append aiRating (like or dislike score) before returning JSON
        var movie = movies.filter(movie => movie.id === jsonData.id);
        jsonData.aiRating = movie[0].rating;
        return jsonData;
    }));
}

//request all promises in the promises array
// save the resolved requests into the state
Promise.all(promises).then(movies => {

    console.log(movies);
    this.setState({userMovies: movies});

})
.catch((error) => {
    // handle your errors here
    console.error(error)
  })
}


}
 
export default App;
