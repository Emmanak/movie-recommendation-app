import * as React from 'react';
import Card from 'react-bootstrap/Card';

function MovieCard(props: any){
    return ( 
        <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src={props.image}/>
        <Card.Body>
            <Card.Title>{props.movieName}</Card.Title>
            <Card.Text>
            {props.overview.substring(0,65)+"..."}
            </Card.Text>
        </Card.Body>
        </Card>
     );
}
 
export default MovieCard;