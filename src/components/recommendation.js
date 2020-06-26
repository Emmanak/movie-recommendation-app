//import brain from 'brain.js';
import {movieID} from './moviecard';
import {movies, genres, movieRatings, testCase, formattedMovies} from './movie-genre-variables';
const brain = require('brain.js');
const network = new brain.NeuralNetwork();


function CreateInput() {
    this.id28=0;
    this.id10759=0;
    this.id12=0;
    this.id16=0;
    this.id35=0;
    this.id80=0;
    this.id99=0;
    this.id18=0;
    this.id10751=0;
    this.id14=0;
    this.id36=0;
    this.id27=0;
    this.id10762=0;
    this.id10402=0;
    this.id9648=0;
    this.id10763=0;
    this.id10764=0;
    this.id10749=0;
    this.id878=0;
    this.id10765=0;
    this.id10766=0;
    this.id10767=0;
    this.id10770=0;
    this.id53=0;
    this.id10752=0;
    this.id10768=0;
    this.id37=0;
}

function CreateOutput() {
    this.like = 0;
    this.dislike = 0;
}

function createTrainingData(movies){
    //*** INITIALIZING EMPTY INPUT OBJECT ***//
    //training data object initialization
    //var input_object = {input: new CreateInput, output: new CreateOutput};

    var moviesLength = movies.length;
    console.log(moviesLength);

    //All (27) movie genres added to training data object. 
    //for(var i = 0; i < genres.length; i++){
      //  input_object.input["id"+genres[i].id] = 0;
    //}
    //adding 28 - budget 29 - popularity 30 - revenue 
    //31 - vote_average 21 - vote_count
    /*input_object.input["budget"] = 0;
    input_object.input["popularity"] = 0;
    input_object.input["revenue"] = 0;
    input_object.input["vote_average"] = 0;
    input_object.input["vote_count"] = 0;*/

    //console.log(input_object);
    

    //Creating Training Data using a Users Movies list and
    // a list of all available genres
    var trainingData = null;
    trainingData = [];
    console.log(trainingData);
    for(var i = 0; i < moviesLength; i++){
        var genreLength = movies[i].genres.length;
        trainingData[i] = {input: new CreateInput(), output: new CreateOutput()}//JSON.parse(JSON.stringify(input_object));
        for(var j = 0; j < genreLength; j++){
            trainingData[i].input["id"+genres[j].id] = 1;
        }
        /*trainingData[i].input["budget"] = 1/movies[i].budget;
        trainingData[i].input["popularity"] = 1/movies[i].popularity;
        trainingData[i].input["revenue"] = 1/movies[i].revenue;
        trainingData[i].input["vote_average"] = 1/movies[i].vote_average;
        trainingData[i].input["vote_count"] = 1/movies[i].vote_count;*/
        trainingData[i].output.like = movieRatings[movies[i].id]/5;
        trainingData[i].output.dislike = 1-(movieRatings[movies[i].id]/5);
        
    }
    console.log(trainingData);
    return(trainingData);
}

function createTestingData(movie){
    //*** INITIALIZING EMPTY INPUT OBJECT ***//
    //training data object initialization
    var testing_object = {input: {}};

    var movieLength = movie.length;
    console.log(movieLength);

    //All (27) movie genres added to training data object. 
    for(var i = 0; i < genres.length; i++){
        testing_object.input["id"+genres[i].id] = 0;
        console.log(testing_object);
    }
    //adding 28 - budget 29 - popularity 30 - revenue 
    //31 - vote_average 21 - vote_count
    /*testing_object.input["budget"] = 0;
    testing_object.input["popularity"] = 0;
    testing_object.input["revenue"] = 0;
    testing_object.input["vote_average"] = 0;
    testing_object.input["vote_count"] = 0;*/

    console.log(testing_object);

    for(var i = 0; i <= movieLength; i++){
        var genreLength = movie[i].genres.length;
        for(var j = 0; j < genreLength; j++){
            testing_object.input["id"+genres[j].id] = 1;
        }

    
    

    //Creating Training Data using a Users movie list and
    // a list of all available genres
    //var testingData = {}


    /*console.log(testingData);
    for(var i = 0; i < movieLength; i++){
        var genreLength = movie[i].genres.length;
        console.log(JSON.parse(JSON.stringify(testing_object)));
        testingData["del"+i] = JSON.parse(JSON.stringify(testing_object));
        console.log(testingData["del"+i]);
        for(var j = 0; j < genreLength; j++){
            testingData["del"+i].input["id"+genres[j].id] = 1;
        }*/
        /*testingData["del"+i].input["budget"] = 1/movie[i].budget;
        testingData["del"+i].input["popularity"] = 1/movie[i].popularity;
        testingData["del"+i].input["revenue"] = 1/movie[i].revenue;
        testingData["del"+i].input["vote_average"] = 1/movie[i].vote_average;
        testingData["del"+i].input["vote_count"] = 1/movie[i].vote_count;*/
        
    }

    console.log(JSON.stringify(testing_object));
    return(testing_object);
}

console.log("hey");
/*var trainingData = createTrainingData(movies);//JSON.stringify(createTrainingData(movies));//.replace(/\"(del)(.*?)\:/g, '');
for(var movie = 0; movie < trainingData.length; movie ++){
    trainingData[movie] = JSON.stringify(trainingData[movie]);
    trainingData[movie] = JSON.parse(trainingData[movie].replace(/"/g, ''));
}*/

//trainingData = JSON.parse(trainingData.replace(/"/g, ''));
//trainingData = trainingData.replace(/^\{/g, '[');
//trainingData = trainingData.replace(/\}$/g, ']');
var trainingData = createTrainingData(movies);
console.log(trainingData[0]);


const data = [
    {input : [0,0], output: [0]},
    {input : [0,1], output: [1]},
    {input : [1,0], output: [1]},
    {input : [1,1], output: [0]}
];

console.log(data);

console.log("Begin training...");
//network.train(eval(trainingData));
network.train(trainingData);
console.log("Training completed!");


var result = 0;

function rateMovie(movieID){
    if(movieID === 0){
        console.log(movieID);
        return;
    }
    fetch("https://api.themoviedb.org/3/movie/"+movieID+"?api_key=04c67358ca6817bcec69c61716577d76&language=en-US")
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url
        
        console.log(movieID);
        /*let testMovie = [jsonData];
        console.log(testMovie);
        var movieJson = createTestingData(testMovie)
        console.log(movieJson);
        movieJson = JSON.stringify(movieJson.input);
        movieJson = movieJson.replace(/"/g, '');
        console.log(movieJson);
        testMovie = movieJson;*/
        let result =  network.run({id28:1,id10759:0,id12:0,id16:1,id35:0,id80:1,id99:0,id18:0,id10751:0,id14:0,id36:0,id27:0,id10762:0,id10402:0,id9648:0,id10763:0,id10764:0,id10749:0,id878:1,id10765:0,id10766:0,id10767:0,id10770:0,id53:0,id10752:0,id10768:0,id37:0});
        console.log(result);
        
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })

}

rateMovie(movieID);




console.log(testCase);

//console.log("Result is:"+result);

/*var brain = require('brain.js')
var net = new brain.recurrent.LSTM();
net.train([
  {input: "my unit-tests failed.", output: "software"},
  {input: "tried the program, but it was buggy.", output: "software"},
  {input: "i need a new power supply.", output: "hardware"},
  {input: "the drive has a 2TB capacity.", output: "hardware"},
  {input: "unit-tests", output: "software"},
  {input: "program", output: "software"},
  {input: "power supply", output: "hardware"},
  {input: "drive", output: "hardware"},
]);
var result = net.run("drive")
console.log("output = "+result);*/


export {rateMovie};

