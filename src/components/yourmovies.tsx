import * as React from 'react';
//import {movies} from './recommendation';
//import {db} from '../fbconfig';
import MovieList from './movieList';
import { MovieContext } from '../movieContext';

export interface YourMoviesProps {
    userData: Array<any>,
    userMovies: Array<any>,
    modifyData: Function
    
}
 
export interface YourMoviesState {
    //userMovies: any;
    //userData: any;
    
}
 
class YourMovies extends React.Component<YourMoviesProps, YourMoviesState> {
    state = {   
        //userMovies : this.props.userMovies,
        //userData: this.props.userData
    }
    render() {
        let props = this.props;

        if(this.props.userMovies.length === 0){
            return ( 
                <React.Fragment>
                    
                </React.Fragment>
             );
        }
        else{
            return(
                <MovieContext.Consumer>
                    {value =>
                    <div> 
                    {/* {<ul>{value.userData.map((item:any) => <li>{item.id}</li>)}</ul>} */}
                    <MovieList movieList={value.userMovies}/></div>
                    }
                </MovieContext.Consumer>
                
            );
        }
    }

    /*readFromFirebase(){
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
    }*/
}
 
export default YourMovies;