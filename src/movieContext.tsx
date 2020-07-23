import React from 'react';
//import React,{useState, createContext} from 'react';

export interface ContextInterface {
    movieList: Array<any>,
    searchQuery: string,
    searchList: Array<any>,
    userData: Array<any>,
    userMovies: Array<any>,
    modifyData: Function
}

let defaultvalue : ContextInterface = {
    movieList: [],
    searchQuery: '',
    searchList: [],
    userData: [],
    userMovies: [],
    modifyData: () =>{}
}

export const MovieContext = React.createContext(defaultvalue);




/*export const MovieContext:any = createContext<ContextInterface | null>(null);

export const MovieProvider = (props:any) => {
    const [movies, setMovies] = useState([]);
    return <MovieContext.Provider>{props.children}</MovieContext.Provider>
};*/



