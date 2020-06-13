import * as React from 'react';
import MovieCard from './moviecard';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


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
        this.setState({ update: true});
    }
    componentWillUnmount(){
        
    }
    render() {
        console.log(this.props.movieList)
        if(this.state.update === true){
            return (
                <TransitionGroup>
                <div id='movieList' className="container">
                    <div id='movies' className="row pb-5">
                        {this.props.movieList.map(movie =><div id={movie.id} key={"movie-"+movie.id.toString()} className="d-flex justify-content-around col-md-4 col-sm-6 col-xs-12 pt-5"><CSSTransition in={true} appear={true} key={movie.id} timeout={1500} classNames="card"><MovieCard 
                        key={movie.id}
                        id={"card-"+movie.id}
                        movieName={movie.title} 
                        image={"https://image.tmdb.org/t/p/w500"+movie.poster_path}
                        overview={movie.overview}/>
                        </CSSTransition></div>)}
                    </div>
                </div>
                </TransitionGroup>
             );
        }
        else{
            console.log(this.state.movieList);
            return(
                <div>
                </div>
            );
        }
        
    }

    
}
 
export default MovieList;