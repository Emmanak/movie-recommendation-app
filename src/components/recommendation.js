//import brain from 'brain.js';
/*import {movieID} from './moviecard';
import {db} from '../fbconfig';
import {localmovies, yourmovies, movieRatings, testCase} from './movie-genre-variables';
import {test} from './navbar';
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
    //this.budget=0;
    this.popularity=0;
    //this.revenue=0;
    this.vote_average=0;
    this.vote_count=0;


}

function CreateOutput() {
    this.like = 0;
    this.dislike = 0;
}


var trainingData;



function createTrainingData(movies){

    var moviesLength = movies.length;
    console.log(moviesLength);
    console.log(movieRatings[movies[0].id]);

   console.log("Test get Your Movies:");
   
    //Creating Training Data using a Users Movies list and
    // a list of all available genres
    var trainingData = [];
    console.log(trainingData);
    for(var i = 0; i < moviesLength; i++){
        var genreLength = movies[i].genres.length;
        trainingData.push({input: new CreateInput(), output: new CreateOutput()});
        var index = trainingData.length-1;
        console.log(index);
        //trainingData[i] = {input: new CreateInput(), output: new CreateOutput()}//JSON.parse(JSON.stringify(input_object));
        for(var j = 0; j < genreLength; j++){
            console.log(movies[i].genres[j].id);
            trainingData[index].input["id"+movies[i].genres[j].id] = 1;
        }
        //trainingData[index].input.budget = Math.log10(movies[i].budget)/(1 + (Math.log10(movies[i].budget)));
        trainingData[index].input.popularity = Math.log10(movies[i].popularity)/(1 + (Math.log10(movies[i].popularity)));
        //trainingData[index].input.revenue = Math.log10(movies[i].revenue)/(1 + (Math.log10(movies[i].revenue)));
        trainingData[index].input.vote_average = movies[i].vote_average/10;
        trainingData[index].input.vote_count = Math.log10(movies[i].vote_count)/(1 + (Math.log10(movies[i].vote_count)));
        //trainingData[index].output.like = (movieRatings[movies[i].id])/5;
        //trainingData[index].output.dislike = 1-((movieRatings[movies[i].id])/5);
        trainingData[index].output.like = 1*(movies[i].aiRating);
        trainingData[index].output.dislike = 1-((movies[i].aiRating));

        console.log(trainingData[index]);
        
    }
    console.log(trainingData);
    return(trainingData);
}



// Uses the AI to rate a movie.
//Takes an input of a movieID
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
        let testMovie = [jsonData];
        console.log(testMovie);
        var movieJson = createTrainingData(testMovie);
        console.log(movieJson);
        let result = network.run(movieJson[0].input);
        alert(result.like+"   "+result.dislike);
        
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })

}


function calculateRecomendation(movies){
    console.log(movies);

    if(movies === undefined ){
        console.log("no movies");
        return;
    }
    
    var promises = [];
    for(var i = 0; i < movies.length; i++){
        promises.push(fetch("https://api.themoviedb.org/3/movie/"+movies[i].id+"?api_key=04c67358ca6817bcec69c61716577d76&language=en-US").then(response => response.json())
        .then(jsonData => {
            //Add like or dislike rating before returning JSON
            var movie = movies.filter(movie => movie.id == jsonData.id)
            jsonData.aiRating = movie[0].rating;
            return jsonData;
        }));
    }

    Promise.all(promises).then(movies => {

        console.log(movies);
        //addToFirebase(yourmovies);
        console.log("logging your movies");
        console.log(test);
        trainingData = createTrainingData(movies);
        console.log("hey"+trainingData[0]);
        console.log("Begin training...");
        network.train(trainingData);
        console.log("Training completed!");
        

    })
    .catch((error) => {
        // handle your errors here
        console.error(error)
      })
}

//Takes an Array of Objects [{},{},...] as an input
//Writes user movies into Firebase
function addToFirebase(movies){
    var movieObjects = Object.assign({}, movies);
    // Add a new document in collection "cities"
    db.collection("emmanuel-augustine").doc("movie-recommendation-app").set(movieObjects)
    .then(function() {
        console.log("Movies successfully written to Firebase!");
    })
    .catch(function(error) {
        console.error("Error writing document to Firebase: ", error);
    });
}

//Takes an empty variable as input and returns and Array
//Reads user movies from Firebase
function readFromFirebase(movies){
    // Add a new document in collection "cities"
    db.collection("emmanuel-augustine").doc("movie-recommendation-app").get()
    .then(function(movies) {
        if(movies.exists){
            movies = Object.assign([], movies.data());
            console.log(movies);
            console.log("Movies successfully read to Firebase!");
            calculateRecomendation(movies);
        }else{
            console.log("No data found");
        }
        
    })
    .catch(function(error) {
        console.error("Error writing document to Firebase: ", error);
    });
}

var movies = [];
readFromFirebase(movies);
rateMovie(movieID);
console.log(testCase);




export {rateMovie};
export{movies};
*/
