import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import no_picture_available from '../images/no_photo_available.png';
//import movie_added from '../images/addMovie-active.png';
import {MovieContext} from '../movieContext';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import { rateMovie } from './recommendation';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

var movieID = 0;

export interface MovieCardProps {
    id: string,
    media_type: string,
    movieName: string,
    image: string,
    overview: string,
    rating: any
    
}
 
export interface MovieCardState {
    
}
 
class MovieCard extends React.PureComponent<MovieCardProps, MovieCardState> {
    //state = { :  }
    render() { 
        return ( 
        <MovieContext.Consumer>
                {value => 
                
                
        <TransitionGroup>
            <CSSTransition in={true} appear={true} key={'cardAnimation'+this.props.id.toString()} timeout={1500} classNames="card">        
        <Card style={{ width: '15rem' }}>
            <div className="addMovie">
            {/* <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={showRating(parseInt(this.props.id.replace('card-','')))}> */}
                <button onClick={(e) => addToYourMovies(value,this.props,e)}  id={this.props.id} className={cardClassname(value,this.props)}/>
                {/* </OverlayTrigger> */}

                <Card.Img variant="top" src={movieImage(this.props)}/>
                
            </div>
        
        <Card.Body>
            {/* <Button onClick={()=> rateMovie(parseInt(this.props.id.replace('card-','')))}>Calculate Rating</Button> */}
        {/* {<button onClick={() => value.modifyData({id:2702151, type:"movie", rating:0})}>Test Context</button>} */}
            <Card.Title>{this.props.movieName} <p><h6>Score: <span id={parseInt(this.props.id.replace('card-',''))+"popup"} className="badge badge-primary">NaN</span></h6></p>
            </Card.Title>
            
            <Card.Text>
                {movieOverview(this.props)}
            
            </Card.Text>
        </Card.Body>
        </Card>
        </CSSTransition>
        </TransitionGroup>}
        </MovieContext.Consumer> );
    }
}

function showRating(movie:any):any{
    console.log("This is the id of the movie",movie);
    rateMovie(movie);

    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Your Rating</Popover.Title>
            <Popover.Content>
            <strong><span id={movie+"popup"}>Calculating...</span></strong>
            </Popover.Content>
        </Popover>
    );

}



// function MovieCard(props: any){
//     return (
//         <MovieContext.Consumer>
//                 {value => 
                
                
//         <TransitionGroup>
//             <CSSTransition in={true} appear={true} key={'cardAnimation'+props.id.toString()} timeout={1500} classNames="card">        
//         <Card style={{ width: '15rem' }}>
//             <div className="addMovie">
//                 <button onClick={(e) => addToYourMovies(value,props,e)}  id={props.id} className={cardClassname(value,props)}/>
//                 <Card.Img variant="top" src={movieImage(props)}/>
//             </div>
        
//         <Card.Body>
//         {/* {<button onClick={() => value.modifyData({id:2702151, type:"movie", rating:0})}>Test Context</button>} */}
//             <Card.Title>{props.movieName}</Card.Title>
//             <Card.Text>
//                 {movieOverview(props)}
            
//             </Card.Text>
//         </Card.Body>
//         </Card>
//         </CSSTransition>
//         </TransitionGroup>}
//         </MovieContext.Consumer>
//      );
                
// }

const movieOverview = (props:any) => {
    if(props.overview !== undefined){
        return props.overview.substring(0,65)+"...";
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
    var filtered_movies = movies.filter((movie:any) => movie.id !== id);
    //console.log(filtered_movie, filtered_movies, id, value.userData);

    
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

const addToYourMovies = (value:any, props:any,e:any) => {
    if(props.media_type === 'tv'){
        alert('Sorry, you selected a TV Show. Please select a MOVIE!');
        return;
    }
    const id = parseInt(props.id.replace('card-',''));
    //use this ID to add movies to a users personal list.
    console.log("Movie "+id+" added to Your Movies!", e.target.id, props.media_type);
    //find DOM element
    let element = document.getElementById(e.target.id) as HTMLElement; 
    var movies = value.userData;
    var filtered_movie = movies.find((movie:any) => movie.id === id);
    var filtered_movies = movies.filter((movie:any) => movie.id !== id);
    //console.log(filtered_movie, filtered_movies, id, value.userData);
    var movie = {
        id: id,
        type:"movie",
        rating: 1
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