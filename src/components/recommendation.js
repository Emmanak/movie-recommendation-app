import {db} from '../fbconfig';
import {test} from './navbar';
const brain = require('brain.js');
const network = new brain.NeuralNetwork();
const network_tv = new brain.NeuralNetwork();

var testTVshow = {
    id16: 1,
    id18: 0,
    id35: 1,
    id37: 0,
    id80: 0,
    id99: 0,
    id9648: 0,
    id10751: 1,
    id10759: 0,
    id10762: 0,
    id10763: 0,
    id10764: 0,
    id10765: 1,
    id10766: 0,
    id10767: 0,
    id10768: 0,
    popularity: 0.1352,
    vote_average: 0.71,
    vote_count: 0.6724617403347662
}


//functions are used to create Objects
function CreateTVInput() {
    this.id10759=0;
    this.id16=0;
    this.id35=0;
    this.id80=0;
    this.id99=0;
    this.id18=0;
    this.id10751=0;
    this.id10762=0;
    this.id9648=0;
    this.id10763=0;
    this.id10764=0;
    this.id10765=0;
    this.id10766=0;
    this.id10767=0;
    this.id10768=0;
    this.id37=0;
    //this.date=0;
    //this.budget=0;
    this.popularity=0;
    //this.revenue=0;
    this.vote_average=0;
    this.vote_count=0;
}


function CreateInput() {
    this.id28=0;
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
    this.id10402=0;
    this.id9648=0;
    this.id10749=0;
    this.id878=0;
    this.id10770=0;
    this.id53=0;
    this.id10752=0;
    this.id37=0;
    this.date=0;
    this.budget=0;
    this.popularity=0;
    this.revenue=0;
    this.vote_average=0;
    this.vote_count=0;
}

function CreateOutput(value) {
    if(value === 1){
        this.like = 1;
        this.dislike = 0;
    }else if(value === 0){
        this.like = 0;
        this.dislike = 1;
    }else{
        this.like = 0;
        this.dislike = 0;
    }
}


var trainingData;



function createTrainingData(movies){

    var moviesLength = movies.length;
   
    //Creating Training Data using a Users Movies list and
    // a list of all available genres
    var trainingData = [];
    var trainingTVData = []

    
    for(var i = 0; i < moviesLength; i++){
        var genreLength = movies[i].genres.length;

        //check if item is a movie or a tv show
        if(movies[i].type === "tv"){
            trainingTVData.push({input: new CreateTVInput(), output: new CreateOutput()});
            
            var index = trainingTVData.length-1;
            
            //Add genres into the trainingTVData input object. 
            for(var j = 0; j < genreLength; j++){
                trainingTVData[index].input["id"+movies[i].genres[j].id] = 1;
            }

            //Add other details into the trainingTVData input object
            //trainingTVData[index].input.budget = movies[i].budget/400000000;//Math.log10(movies[i].budget)/(1 + (Math.log10(movies[i].budget)));
            trainingTVData[index].input.popularity = movies[i].popularity/250;//Math.log10(movies[i].popularity)/(1 + (Math.log10(movies[i].popularity)));
            //trainingTVData[index].input.revenue = movies[i].revenue/3000000000;//Math.log10(movies[i].revenue)/(1 + (Math.log10(movies[i].revenue)));
            trainingTVData[index].input.vote_average = movies[i].vote_average/10;
            //trainingTVData[index].input.date = Math.log10(new Date(movies[i].release_date).getTime())/(1+ Math.log10(new Date().getTime()));
            trainingTVData[index].input.vote_count = Math.log10(movies[i].vote_count)/(1 + (Math.log10(movies[i].vote_count)));
            trainingTVData[index].output.like = 1*(movies[i].aiRating);
            trainingTVData[index].output.dislike = 1-((movies[i].aiRating));

        }else{
            trainingData.push({input: new CreateInput(), output: new CreateOutput()});
            
            var index = trainingData.length-1;
            
            //Add genres into the trainingData input object. 
            for(var j = 0; j < genreLength; j++){
                trainingData[index].input["id"+movies[i].genres[j].id] = 1;
            }

            //Add other details into the trainingData input object
            trainingData[index].input.budget = movies[i].budget/400000000;//Math.log10(movies[i].budget)/(1 + (Math.log10(movies[i].budget)));
            trainingData[index].input.popularity = movies[i].popularity/250;//Math.log10(movies[i].popularity)/(1 + (Math.log10(movies[i].popularity)));
            trainingData[index].input.revenue = movies[i].revenue/3000000000;//Math.log10(movies[i].revenue)/(1 + (Math.log10(movies[i].revenue)));
            trainingData[index].input.vote_average = movies[i].vote_average/10;
            trainingData[index].input.date = Math.log10(new Date(movies[i].release_date).getTime())/(1+ Math.log10(new Date().getTime()));
            trainingData[index].input.vote_count = Math.log10(movies[i].vote_count)/(1 + (Math.log10(movies[i].vote_count)));
            trainingData[index].output.like = 1*(movies[i].aiRating);
            trainingData[index].output.dislike = 1-((movies[i].aiRating));

        }

        
    }

    //Adding dislike for all zero entries
    if(trainingData.length > 1){
        trainingData.push({input: new CreateInput(), output: new CreateOutput(0)});
    }
    if(trainingTVData.length > 1){
        trainingTVData.push({input: new CreateInput(), output: new CreateOutput(0)});
    }

    var inputData = {
        movies: trainingData,
        tv: trainingTVData
    }
    //console.log(inputData);

    return(inputData);
}



// Uses the AI to rate a movie.
//Takes an input of a movieID(media ID) and type of media(movie or tv)
function rateMovie(movieID,type){

    var media_type;

    if(type === undefined){
        media_type = "movie";
    }else{
        media_type = type;
    }


    if(movieID === 0 || movieID === undefined || movieID === null){
        return;
    }


    fetch("https://api.themoviedb.org/3/"+media_type+"/"+movieID+"?api_key=04c67358ca6817bcec69c61716577d76&language=en-US")
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url

        //Create testing data with movie object
        jsonData.type = media_type;
        let testMovie = [jsonData];
        var movieJson = createTrainingData(testMovie); //can also be used to create testing data

        //Calculate rating based on trained AI.
        var result;
        var rating;
        if(media_type === 'tv' && movieJson.tv.length > 0){
            result = network_tv.run(movieJson.tv[0].input);
            rating = Math.round(result.like*100);

        }else{

            result = network.run(movieJson.movies[0].input);
            rating = Math.round(result.like*100);

        }
        
        //Change badge color based on the range of the rating value
        var matchRating = document.getElementById(movieID+"popup");
        if(rating < 70 && rating >= 40){
            matchRating.className = "badge badge-warning";
            matchRating.textContent = rating.toString()+ "% Match";
        }
        else if(rating < 40){
            matchRating.className = "badge badge-danger";
            matchRating.textContent = rating.toString()+ "% Match";
        }
        else if(rating >= 70){
            matchRating.className = "badge badge-success";
            matchRating.textContent = rating.toString()+ "% Match";
        }

        return rating;
        
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })

}


function calculateRecomendation(movies){

    if(movies === undefined || movies === []){
        console.log("no movies");
        return;
    }
    
    var promises = [];
    for(var i = 0; i < movies.length; i++){
        promises.push(fetch("https://api.themoviedb.org/3/"+movies[i].type+"/"+movies[i].id+"?api_key=04c67358ca6817bcec69c61716577d76&language=en-US").then(response => response.json())
        .then(jsonData => {

            //Add like or dislike rating before returning JSON
            var movie = movies.filter(movie => movie.id == jsonData.id)
            jsonData.aiRating = movie[0].rating;
            jsonData.type = movie[0].type;
            return jsonData;

        }).catch(function(error){
            console.log(error);
        }));
    }

    Promise.all(promises).then(movies => {
        console.log(movies);
        console.log("Preparing training data...");
        trainingData = createTrainingData(movies);
        console.log("Training in progress...");
        network_tv.train(trainingData.tv)
        network.train(trainingData.movies);
        console.log("Training Completed!");     
        

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






export {rateMovie};
export {calculateRecomendation}
