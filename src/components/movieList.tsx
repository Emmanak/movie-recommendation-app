import * as React from 'react';
import MovieCard from './moviecard';
import {rateMovie} from './recommendation';
import Loading from './loading';


export interface MovieListProps {
    movieList: Array<any>,
    renderReady: boolean
    
}
 
export interface MovieListState {
    movieList: Array<any>,
    update: boolean



    
}
 
class MovieList extends React.Component<MovieListProps, MovieListState> {
    state = { 
        movieList: [
            {id:"none", title:"none", image:"none", overview:"none", poster_path:"none"}
        ],
        update: false
    }
    componentDidMount(){
        console.log("Set 8");
    }
    componentWillUnmount(){
        
    }
    render() {

        if(this.props.movieList !== [] && this.props.renderReady === true){
            return (
                <div id='movieList' className="container">
                    <div id='movies' className="row pb-5">
                        {this.props.movieList.map(movie =><div id={movie.id} key={"movie-"+movie.id.toString()} className="d-flex justify-content-around col-md-4 col-sm-6 col-xs-12 pt-5">
                        <MovieCard 
                        key={movie.id}
                        id={"card-"+movie.id}
                        media_type = {movie.first_air_date ? "tv": "movie"}
                        movieName={movie.title}
                        movieInfo={movie}
                        rating={rateMovie(movie.id, movie.first_air_date ? "tv" : "movie")}
                        image={"https://image.tmdb.org/t/p/w500"+movie.poster_path}
                        overview={movie.overview}/>
                        </div>)}
                    </div>
                </div>
             );
        }
        else{
            return(
                <div>
                    <Loading></Loading>
                </div>
            );
        }
        
    }

    
}


 
export default MovieList;