import React from 'react';
import MovieList from './movieList';
import NavBar from "./navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import YourMovies from './yourmovies';
import {db} from '../fbconfig';
import {MovieContext} from '../movieContext';
import {calculateRecomendation} from './recommendation';
import DropdownFilter from './dropdownFilter';
import Button from 'react-bootstrap/Button';


//Local Variables to reduce usage of setState
var init_flag:boolean = false;
var tempState:any = {
  movieList : [],
  searchQuery : '',
  userData: [],
  userMovies: [],
  searchList : [],
  typingTimeout: 0,
  discoverMovies : []
}




export interface MovieAppProps {
    discoverPage:any,
    setDiscoverPage: any
  
}
 
export interface MovieAppState {
  movieList: Array<any>,
  searchQuery: string,
  searchList: Array<any>,
  userData: Array<any>,
  userMovies: Array<any>,
  modifyData: Function,
  renderReady: boolean,
  discoverPage: any,
  pageNumber: number

  
}



 
class MovieApp extends React.Component<MovieAppProps, MovieAppState> {

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
      console.log(movies);
    },
    renderReady: false,
    discoverPage: [],
    pageNumber: 1,
    searchPage: 1
    }

    

    
    componentWillMount(){
      if(init_flag === false){
        this.readFromFirebase();
      }
      
    }

    
  

  render() {

    

    //Used to send props with MovieList Component in react-router
    const passMovieList = () => {
      if(this.state.searchQuery === '' || tempState.searchQuery === '' ){

        return(
            <React.Fragment>
            <Button onClick={()=>this.filterDiscoverMovies(undefined, 'previous page')}>Next Page</Button>
            <DropdownFilter changeFilter={this.filterDiscoverMovies}></DropdownFilter>
            <Button onClick={()=>this.filterDiscoverMovies(undefined, 'next page')}>Next Page</Button>
            <MovieList renderReady={this.state.renderReady} 
            movieList={this.state.discoverPage.length === 0 ? this.props.discoverPage : this.state.discoverPage}/>
            </React.Fragment>
          );        

      }else{

        console.log(this.state.searchQuery, this.state.searchList, tempState.searchQuery);
        return(
            <MovieList renderReady={this.state.renderReady} movieList={this.state.searchList}/>
        );

      }
      
    }

    //Pass YourMovies component with props into react-router
    const passYourMovies = () => {
      if(this.state.searchQuery === ''){
        console.log("Your Movies!")
        return(
          <YourMovies
          renderReady={this.state.renderReady}
          userData={this.state.userData}
          userMovies={this.state.userMovies}
          modifyData={this.state.modifyData}>
          </YourMovies>
        );
      }
      else{
        console.log("Search List!", this.state.searchList)
        return(
          <MovieList renderReady={this.state.renderReady} movieList={this.state.searchList}/>
        );
      }
      
    }

    let that = this.state;

    if(that.movieList !== [] && that.searchList !== [] && that.userData !== [] && that.userMovies !== [] && this.state.discoverPage !== undefined){
      console.log(this.props.discoverPage);
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
            <Route path="/discover" exact component={passMovieList}></Route>
            <Route path="/your-movies" exact component={passYourMovies}></Route>
          </Switch>
        </Router>
        
        </MovieContext.Provider>
      </React.Fragment>
      );

      
    }else{
        console.log(this.props.discoverPage);
        console.log("Loading");
        console.log(this.state.movieList,this.state.userMovies,this.state.userData,this.state.searchQuery,this.state.searchList);
        return ( 
            <React.Fragment>
            <div>Loading MovieApp</div>
        </React.Fragment>
       );
    }
  }


  

//Method returns discover query from TMDB
  //save a list of movie objects to tempState
  filterDiscoverMovies = (filterValue?:string, page?:string) => {

    //set filter
    console.log("Filter Value: "+filterValue);
    var discoverFilter = 'popularity.desc';
    if(filterValue !== undefined){
      discoverFilter = filterValue;
    }

    //set pageNumber for serach query
    var pageNumber = this.state.pageNumber;
    if(page === 'previous page'){
        if(pageNumber > 1){
            pageNumber--;
        }
    }else if(page === 'next page'){
        pageNumber++;
    }

    const query = {
      popular: 'https://api.themoviedb.org/3/movie/popular?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=1',
      trending: 'https://api.themoviedb.org/3/trending/all/day?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=',
      multi: 'https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query=family',
      discover: 'https://api.themoviedb.org/3/discover/movie?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&sort_by='+discoverFilter+'&include_adult=false&include_video=false&page='
    }
    console.log(query.discover);

    //get current popular movies from the database
    fetch(query.discover+pageNumber.toString())
    .then(response => response.json())
    .then(jsonData => {

        console.log(jsonData.results);
        tempState.discoverMovies = jsonData.results;
        this.setState({discoverPage:jsonData.results, pageNumber: pageNumber});
        console.log("Successfully retrieved Popular Movies!");

    })
    .catch((error) => {

        // handle your errors here
        console.error(error);

    })
    

    
  }

//Input from search box is read through onChange property
//The timeout functions ensures the search doesn't commence
//until the user has finished typing. 
  readInput = (event:any) => {

    //If search value is empty then 
    //restore previous moivie cards
    if(event.target.value === ''){
      tempState.searchList = [];
      tempState.movieList = tempState.discoverMovies;
      tempState.searchQuery = '';
      this.setState({searchQuery : ''});
      console.log(this.state.searchQuery, tempState.searchQuery);
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

    //If the searchstring has somehow changed or the search string
    //is 1 character or less in length, then don't complete the search.
    if(searchString !== tempState.searchQuery || searchString.length <=0){
      //If the user only typed 1 letter in search
      //runs before search
      if(this.state.searchList.length === 0){
        return;
      }

      //If the user deletes all but 1 letter in search
      //runs after search
      tempState.searchList = [];
      console.log("Set 2")
      this.setState({searchList: tempState.searchList, movieList: tempState.movieList, userData: tempState.userData, searchQuery:tempState.searchQuery});
      tempState.searchQuery = '';
      return;
    }
    //search database for movies based on user input
    //replaces spaces with "+"
    var searchQuery = searchString.replace(/ /g,"+");
    fetch('https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query='+searchQuery)
    .then(response => response.json())
    .then(jsonData => {
      //jsonData is parsed json object received from url
      //setting UserData State to update state with most 
      //recent userData since it isn't updated often
      console.log("Set 4",jsonData.results);
      tempState.searchList = jsonData.results;
      this.setState({searchList: tempState.searchList, movieList: tempState.movieList, userData: tempState.userData, searchQuery:tempState.searchQuery});
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

    //Read document from emmanuel-augustine/movie-recommendation-app
    //Needs to be changed to user account with Firebase user login
    db.collection("emmanuel-augustine").doc("movie-recommendation-app").get()
    .then( (movies) => {
        if(movies.exists){

            //make JSON into an array to make it iterable.
            var userData:any = Object.assign([], movies.data());
            console.log("Movies successfully read to Firebase!");
            console.log(userData,"Set 6");

            //Query movie Database for movie objects.
            //For performance, both calculateRecomentation()
            //and readFromTMDB query movie objects from TMDB. 
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

//Request all promises in the promises array
//Save the resolved requests into the state
Promise.all(promises).then(movieData => {

    console.log("Set 7");    
    this.setState({userMovies: movieData, userData: movies, movieList: tempState.movieList, searchList: tempState.searchList, renderReady: true});
    tempState.userMovies = movieData;
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
 
export default MovieApp;
