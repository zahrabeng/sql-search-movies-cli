import { question } from "readline-sync";
import { Client } from "pg";
const readlineSync = require('readline-sync');

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name.
const client = new Client({ database: 'omdb' });

console.log("Welcome to search-movies-cli!");

async function excecute (){
    await client.connect();

    let options = ["Search" , "See Favourites" , "Quit"]
    let index = readlineSync.keyInSelect(options, 'Choose an Action!');

    if (options[index] === "Search"){
        let searchString = readlineSync.question("Search for what movie? ('q' to quit): ")
        let lowerCaseInput = searchString.toLowerCase()

        while(lowerCaseInput){
            const text = "SELECT id, name, date, runtime, budget, revenue, vote_average, votes_count FROM movies WHERE kind = $1 AND LOWER(name) LIKE $2 ORDER BY date DESC LIMIT 10";
            const value = ["movie", `%${lowerCaseInput}%`];
        
            const res = await client.query(text,value);
            const data = res.rows
            console.table(data)
            let movieOptions = data.map((movie) => movie.name)
            let index = readlineSync.keyInSelect(movieOptions, 'Choose a movie row number to favourite');

        }    
    }
    else if (options[index] === "Quit"){
        console.log('Quit Successfully')
        await client.end(); 
    }
}

excecute()

