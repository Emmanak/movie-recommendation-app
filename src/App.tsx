import React from 'react';
import './App.css';
import MovieList from './components/movieList';
import NavBar from "./components/navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import YourMovies from './components/yourmovies';
import {db} from './fbconfig';
import {MovieContext} from './movieContext';
//import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {calculateRecomendation} from './components/recommendation';

var init_flag:Boolean = false;

var tempState:any = {
  movieList : [],
  searchQuery : '',
  userData: [],
  userMovies: [],
  searchList : [],
  typingTimeout: 0
}




export interface AppProps {
  
}
 
export interface AppState {
  movieList: Array<any>,
  searchQuery: string,
  searchList: Array<any>,
  userData: Array<any>,
  userMovies: Array<any>,
  modifyData: Function
  
}


 
class App extends React.PureComponent<AppProps, AppState> {

  state = { 
    movieList: [],
    searchQuery: '',
    searchList: [],
    userData: [],
    userMovies: [],
    modifyData: (movies:Array<any>) => {
      console.log("Set 1");
      this.setState({userData: movies});
      tempState.userData = movies;
      this.addToFirebase(movies);
      //this.readFromFirebase();
      console.log(movies);
    }
    }

    
    //const test:any;

    componentWillMount(){
      if(init_flag === false){
        this.readFromFirebase();
        this.getPopularMovies();
        init_flag = true;
      }
      
    }

    
  //   componentDidMount(){
  //     console.log("Calculate Recommendation");
  //     calculateRecomendation(this.state.userData);
  // }
  

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
          userMovies={this.state.userMovies}
          modifyData={this.state.modifyData}>
          </YourMovies>
        );
      }
      else{
        return(
          <MovieList movieList={this.state.movieList}/>
        );
      }
      
    }

    let that = this.state;

    if(that.movieList !== [] && that.searchList !== [] && that.userData !== [] && that.userMovies !== []){
      console.log("")
      return(
        <React.Fragment>
          <MovieContext.Provider value={this.state}>
          
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
        
        </MovieContext.Provider>
      </React.Fragment>
      );
    }else{
      console.log("Loading");
      console.log(this.state.movieList,this.state.userMovies,this.state.userData,this.state.searchQuery,this.state.searchList);
      return ( 
        <React.Fragment>
          <h1>Loading</h1>Loading
      </React.Fragment>
       );
    }
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
        tempState.movieList = jsonData.results;
        tempState.searchList = jsonData.results;
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    }
    console.log("Successfully retrieved Popular Movies!");
    
  }

  
//Input from search box is read through onChange property
//The timeout functions ensures the search doesn't commence
// until the user has finished typing. 
  readInput = (event:any) => {

    if(event.target.value === ''){
      console.log("Set 3");
      this.setState({movieList: this.state.searchList});
      return;
    }

    //When a new event is triggerd, the old timeout is cleared
    //and below it is renewed for another 1000ms
    if(tempState.typingTimeout){
      clearTimeout(tempState.typingTimeout);
    }

    tempState.searchQuery = event.target.value;
    tempState.typingTimeout = setTimeout(() => this.searchInput(tempState.searchQuery), 1000);
  
  }

  searchInput = (searchString:string)=> {
    if(searchString !== tempState.searchQuery){
      console.log(searchString, tempState.searchQuery);
      return;
    }
    
    //search database for movies based on user input
    //replaces spaces with "+"
    var searchQuery = searchString.replace(/ /g,"+");
    fetch('https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query='+searchQuery)
    .then(response => response.json())
    .then(jsonData => {

      //jsonData is parsed json object received from url
      console.log("Set 4",jsonData.results);
      this.setState({movieList: jsonData.results, userData: tempState.userData, searchQuery:tempState.searchQuery});
      //Clear search query once the search has completed
      tempState.searchQuery = '';
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
      
    }

  
  readFromFirebase(){
    console.log(this.state.userData);
    //read document from emmanuel-augustine/movie-recommendation-app
    db.collection("emmanuel-augustine").doc("movie-recommendation-app").get()
    .then( (movies) => {
        if(movies.exists){

            //make JSON into an array to make it iterable.
            var userData:any = Object.assign([], movies.data());
            console.log("Movies successfully read to Firebase!");
            console.log(userData,"Set 6");

            //store user Data
            //this.setState({userData: userData});

            //query movie Database
            calculateRecomendation(userData);
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
Promise.all(promises).then(movieData => {

    //console.log(movies);
    console.log("Set 7");
    //return movies;
    
    this.setState({userMovies: movieData, userData: movies, movieList: tempState.movieList, searchList: tempState.searchList});
    
    tempState. userMovies = movieData;
    tempState.userData = movies;
    


})
.catch((error) => {
    // handle your errors here
    console.error(error)
  })
}

//Takes an Array of Objects [{},{},...] as an input
//Writes user movies into Firebase
addToFirebase(movies:Array<any>){
  var movieObjects = Object.assign({}, movies);
  // Add a new document in collection "cities"
  db.collection("emmanuel-augustine").doc("movie-recommendation-app").set(movieObjects)
  .then(function() {
      console.log("Movies successfully written to Firebase!");
  })
  .catch(function(error) {
      console.error("Error writing document to Firebase: ", error);
  });
}

}
 
export default App;
