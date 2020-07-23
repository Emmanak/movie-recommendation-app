import * as React from 'react';
import MovieCard from './moviecard';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {rateMovie} from './recommendation';
//import {TransitionGroup, CSSTransition} from 'react-transition-group';


export interface MovieListProps {
    movieList: Array<any>
    
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
        console.log(this.state.update);
        this.setState({ update: true});
        console.log("Set 8");
    }
    componentWillUnmount(){
        
    }
    render() {
        //console.log(this.props.movieList)
        if(this.state.update === true && this.props.movieList !== []){
            return (
                // <TransitionGroup>
                // <div id='movieList' className="container">
                //     <div id='movies' className="row pb-5">
                //         {this.props.movieList.map(movie =><div id={movie.id} key={"movie-"+movie.id.toString()} className="d-flex justify-content-around col-md-4 col-sm-6 col-xs-12 pt-5"><CSSTransition in={true} appear={true} key={movie.id} timeout={1500} classNames="card"><MovieCard 
                //         key={movie.id}
                //         id={"card-"+movie.id}
                //         media_type = {movie.media_type}
                //         movieName={movie.title} 
                //         image={"https://image.tmdb.org/t/p/w500"+movie.poster_path}
                //         overview={movie.overview}/>
                //         </CSSTransition></div>)}
                //     </div>
                // </div>
                // </TransitionGroup>
                <div id='movieList' className="container">
                    <div id='movies' className="row pb-5">
                        {this.props.movieList.map(movie =><div id={movie.id} key={"movie-"+movie.id.toString()} className="d-flex justify-content-around col-md-4 col-sm-6 col-xs-12 pt-5">
                        <MovieCard 
                        key={movie.id}
                        id={"card-"+movie.id}
                        media_type = {movie.media_type}
                        movieName={movie.title}
                        rating={rateMovie(movie.id)} 
                        image={"https://image.tmdb.org/t/p/w500"+movie.poster_path}
                        overview={movie.overview}/>
                        </div>)}
                    </div>
                </div>
             );
        }
        else{
            //console.log(this.state.movieList);
            return(
                <div>
                </div>
            );
        }
        
    }

    
}


 
export default MovieList;