import * as React from 'react';
//import {movies} from './recommendation';
//import {db} from '../fbconfig';
import MovieList from './movieList';
import { MovieContext } from '../movieContext';

export interface YourMoviesProps {
    userData: Array<any>,
    userMovies: Array<any>,
    modifyData: Function,
    renderReady: boolean
    
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
                    <MovieList renderReady={this.props.renderReady} movieList={value.userMovies}/></div>
                    }
                </MovieContext.Consumer>
                
            );
        }
    }
}
 
export default YourMovies;