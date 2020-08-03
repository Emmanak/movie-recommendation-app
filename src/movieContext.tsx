import React from 'react';

export interface ContextInterface {
    movieList: Array<any>,
    searchQuery: string,
    searchList: Array<any>,
    userData: Array<any>,
    userMovies: Array<any>,
    modifyData: Function,
    renderReady: boolean,
    discoverPage:any,
    pageNumber: number,
    searchPage: number,
    filterValue: string,
    setFilter:Function
}

let defaultvalue : ContextInterface = {
    movieList: [],
    searchQuery: '',
    searchList: [],
    userData: [],
    userMovies: [],
    modifyData: () =>{},
    renderReady: false,
    discoverPage: [],
    pageNumber: 1,
    searchPage: 1,
    filterValue: "popularity.desc",
    setFilter: ()=>{}
}

export const MovieContext = React.createContext(defaultvalue);


