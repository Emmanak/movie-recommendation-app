import * as React from 'react';


//Method returns discover query from TMDB
  //save a list of movie objects to tempState
  function getPopularMovies (tempState:any, init_flag:boolean, filterValue?:string){
    if(init_flag === true){
      return;
    }
    console.log("Filter Value: "+filterValue);
    var discoverFilter = 'popularity.desc';
    if(filterValue !== undefined){
      discoverFilter = filterValue;
    }
    alert(discoverFilter);

    const query = {
      popular: 'https://api.themoviedb.org/3/movie/popular?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=',
      trending: 'https://api.themoviedb.org/3/trending/all/day?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page=',
      multi: 'https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query=family',
      discover: 'https://api.themoviedb.org/3/discover/movie?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&sort_by='+discoverFilter+'&include_adult=false&include_video=false&page=1'
    }
    var page : string = Math.round(Math.random() * 10).toString();
    //if(this.state.searchQuery === ''){
      
      //get current popular movies from the database
      fetch(query.discover) //+page
      .then(response => response.json())
      .then(jsonData => {
        
        //jsonData is parsed json object received from url
        tempState.discoverMovies = jsonData.results;
        init_flag = true;
        //tempState.movieList = jsonData.results;
        //tempState.searchList = [];
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    //}
    console.log("Successfully retrieved Popular Movies!");
    
  }

  export {getPopularMovies};

  