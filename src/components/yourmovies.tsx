import * as React from 'react';


/* 
    - Have a way to add movies to a list
        Make methods inside the class
        https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs
        Considering: 
            typing to input then Adding, but not User friendly.
            Could do this. At the top. Have an Add entry.        
    - List movies
        List the movies with picture. Will update after Adding to list. Therefore, need to mount?
        We do have states. Gotta be clear on state and mount.

    - Empty list - done.
    - add to list
    - display list of movie strings

*/
export interface YourMoviesProps {
    
}
 
export interface YourMoviesState {
    /* Export so others can import the interface 
       Also can be used in YourMovies class if passed in.
    */
    myMovies: Array<string>;
    title: string;
}
 
class YourMovies extends React.Component<YourMoviesProps, YourMoviesState> {

    constructor(props: any) {
        super(props);
        this.state = { myMovies: [],
            title: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getMovies = this.getMovies.bind(this);
    }

    
    
    render() {        
        return ( 
            <React.Fragment>
                <form>
                    <input type="text" value={this.state.title} onChange={this.onChange} />
                </form>         
                <button type="button" onClick={this.onSubmit}>Add</button>
                <h1>Your Movies:</h1>                                
                <li>
                    {                
                    this.state.myMovies.map(movie => <ul>
                        {movie}
                    </ul>)
                    }
                </li>
                <button onClick={this.getMovies}>Edit List</button>
            </React.Fragment>
         );
    }
    onChange = (event: any) => {
        this.setState({title: event.target.value})
    }
    onSubmit = (event: any) => {                
        var myMovies: Array<string> = this.state.myMovies;
        myMovies.push(this.state.title);
        this.setState({myMovies: myMovies});
    }
    getMovies = () => {
        var myMovies: Array<string> = this.state.myMovies;
        myMovies.push('Ironman');
        this.setState({myMovies: myMovies});
    }
}


export default YourMovies;