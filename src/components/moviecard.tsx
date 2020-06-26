import * as React from 'react';
import Card from 'react-bootstrap/Card';
import no_picture_available from '../images/no_photo_available.png';
//import movie_added from '../images/addMovie-active.png';

var movieID = 0;

function MovieCard(props: any){
    return ( 
        <Card style={{ width: '15rem' }}>
            <div className="addMovie">
                <input type="checkbox" onClick={() => addToYourMovies(props)}  id={props.id} className="addMovieButton"></input>
                <Card.Img variant="top" src={movieImage(props)}/>
            </div>
        
        <Card.Body>
            <Card.Title>{props.movieName}</Card.Title>
            <Card.Text>
                {movieOverview(props)}
            
            </Card.Text>
        </Card.Body>
        </Card>
     );
}

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

const addToYourMovies = (props:any) => {
    const id = props.id.replace('card-','');
    //use this ID to add movies to a users personal list.
    console.log("Movie "+id+" added to Your Movies!");
    movieID = id;
}
 
export default MovieCard;

export {movieID};