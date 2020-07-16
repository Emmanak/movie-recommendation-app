import React,{useState, createContext} from 'react';

export interface ContextInterface {
    movies : Array<any>
}

export const MovieContext:any = createContext<ContextInterface | null>(null);

export const MovieProvider = (props:any) => {
    const [movies, setMovies] = useState([]);
    return <MovieContext.Provider>{props.children}</MovieContext.Provider>
};
