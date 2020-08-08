import * as React from 'react';
import Card from 'react-bootstrap/Card';
import no_picture_available from '../images/no_photo_available.png';
import {MovieContext} from '../movieContext';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {Genre} from './genre';

var movieID = 0;

export interface MovieCardProps {
    id: string,
    media_type: string,
    movieName: string,
    image: string,
    movieInfo: any,
    overview: string,
    rating: any
    
}
 
export interface MovieCardState {
    
}
 
class MovieCard extends React.PureComponent<MovieCardProps, MovieCardState> {
    
    render() { 
        return ( 
        <MovieContext.Consumer>
                {value => 
                
                
            <TransitionGroup>
                <CSSTransition in={true} appear={true} key={'cardAnimation'+this.props.id.toString()} timeout={1500} classNames="card">        
                    <Card style={{ width: '15rem' }}>
                        
                        <div className="addMovie">
                            <button onClick={(e) => addToYourMovies(value,this.props,e)}  id={this.props.id} 
                            className={cardClassname(value,this.props)}/>
                            <Card.Img variant="top" src={movieImage(this.props)}/>
                            <span id="mediatag" className={mediatagClassname(this.props.media_type)}>{this.props.media_type}</span>
                        </div>

                        <Card.Body>

                <Card.Title><span>{this.props.movieName}</span> 
                            <p><span id={parseInt(this.props.id.replace('card-',''))+"popup"} 
                            className="badge badge-primary">Match Unavailable</span></p>
                            {moreInfo(this.props.movieInfo)}
                            </Card.Title>

                            {/* <Card.Text>
                                {movieOverview(this.props)}
                                {moreInfo(this.props.movieInfo)}                              
                            </Card.Text> */}

                        </Card.Body>
                    </Card>
                </CSSTransition>
            </TransitionGroup>}
        </MovieContext.Consumer> );
    }
}

const movieOverview = (props:any) => {
    if(props.overview !== undefined){
        return props.overview.substring(0,45)+"...";
    }
    else{
        return props.overview;
    }
}

const movieImage = (props:any) =>{
    const null_URL = 'https://image.tmdb.org/t/p/w500null';
    const undef_URL = 'https://image.tmdb.org/t/p/w500undefined';
    if(props.image === null_URL || props.image === undef_URL){
        //console.log(props.image);
        return no_picture_available;
    }
    else{
        return props.image;
    }
}

const cardClassname = (value:any, props:any) =>{
    let id = parseInt(props.id.replace('card-','')); 
    var movies = value.userData;
    var filtered_movie = movies.find((movie:any) => movie.id === id);

    //Array of movies without the individual filtered movie
    //var filtered_movies = movies.filter((movie:any) => movie.id !== id);

    
    if(filtered_movie === undefined){
        return "addMovieButton";
    }else{
        if(filtered_movie.rating === 1){
            return "addMovieButton-like";
        }else if(filtered_movie.rating === 0){
            return "addMovieButton-dislike";
        }
    }

}

const mediatagClassname = (media_type:string) =>{

    if(media_type === "movie"){
        return "badge badge-primary";

    }else if(media_type === "tv"){
        return "badge badge-warning";

    }else{
        return "badge badge-secondary";
    }
}

const moreInfo = (props:any) =>{
    var genre:Array<any> = props.genre_ids;
    var genre2:Array<any> = props.genres;

    if(genre2 === undefined){
            genre2 = [
                {id:"NaN"}
            ];
    }
    if(genre === undefined && genre2 !== undefined){
        var new_genre = [];
        for(var i = 0; i < genre2.length; i++){
            new_genre[i] = genre2[i].id;
        }
        genre = new_genre;
    }

    return(
        <OverlayTrigger
        placement="auto"
        trigger='hover'
        delay={{ show: 250, hide: 5000 }}
        overlay={
        <Popover id="popover-basic">
            <Popover.Title as="h3">About</Popover.Title>
                <Popover.Content>
                    <p><span className="badge badge-warning"><strong>{+props.vote_average+"/10"}</strong></span> ({props.vote_count} votes)</p>
                    <p>{props.overview}</p>
                    <p><strong>Genre: </strong>{genre.map( (genreID:number) => <span className="badge badge-secondary ml-1">{Genre(genreID)}</span>)}</p>
                    <p><span className="badge badge-primary">{props.release_date ? props.release_date : props.first_air_date}</span></p>
                </Popover.Content>
      </Popover>}>
        <span className="badge badge-secondary"> More</span></OverlayTrigger>
    );
    
}

const addToYourMovies = (value:any, props:any,e:any) => {

    const id = parseInt(props.id.replace('card-',''));
    //use this ID to add movies to a users personal list.

    console.log("Movie "+id+" added to Your Movies!", e.target.id, props.media_type);

    //find DOM element
    let element = document.getElementById(e.target.id) as HTMLElement; 
    var movies = value.userData;
    var filtered_movie = movies.find((movie:any) => movie.id === id);
    var filtered_movies = movies.filter((movie:any) => movie.id !== id);

    var movie = {
        id: id,
        type:"movie",
        rating: 1
    }

    if(props.media_type === 'tv'){
        movie.type = "tv";
    }

    if(filtered_movie !== undefined){

        if(element.className === "addMovieButton"){
            element.className = "addMovieButton-like";
            movie.rating = 1;
            filtered_movies.push(movie);
            value.modifyData(filtered_movies);
    
        }
        else if( element.className === "addMovieButton-like"){
            element.className = "addMovieButton-dislike";
            movie.rating = 0;
            filtered_movies.push(movie);
            value.modifyData(filtered_movies);
        }
        else{
            element.className = "addMovieButton";
            value.modifyData(filtered_movies);
            
        }

    }else{
        element.className = "addMovieButton-like";
        movie.rating = 1;
        filtered_movies.push(movie);
        value.modifyData(filtered_movies);

    }

    movieID = id;
}
 
export default MovieCard;

export {movieID};