import * as React from 'react';

export interface YourMoviesProps {
    
}
 
export interface YourMoviesState {
    
}
 
class YourMovies extends React.Component<YourMoviesProps, YourMoviesState> {
    state = {   }
    render() { 
        return ( 
            <React.Fragment>
                <h1>Your Movies:</h1>
            </React.Fragment>
         );
    }
}
 
export default YourMovies;