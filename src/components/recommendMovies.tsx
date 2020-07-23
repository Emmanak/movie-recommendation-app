import * as React from 'react';
import Button from 'react-bootstrap/Button';
import {MovieContext} from '../movieContext';
import {calculateRecomendation} from './recommendation';


export interface RecommendMoviesProps {
    
}
 
export interface RecommendMoviesState {
    
}
 
class RecommendMovies extends React.Component<RecommendMoviesProps, RecommendMoviesState> {
    //state = { :  }
    render() { 
        return ( 
            <MovieContext.Consumer>
                {value => 
                <Button onClick={() => calculateRecomendation(value.userData)}>Enable Movie Recommendation</Button>}
            </MovieContext.Consumer>
         );
    }
}
 
export default RecommendMovies;