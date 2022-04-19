import { question } from "readline-sync";
import { Client } from "pg";
const readlineSync = require('readline-sync');

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name.
const client = new Client({ database: 'omdb' });
console.log("Welcome to search-movies-cli!");


const searchString = readlineSync.question("Search for what movie? ('q' to quit): ")
const lowerCaseInput = searchString.toLowerCase()


async function excecute (){
    await client.connect();
    const text = "SELECT id, name, date, runtime, budget, revenue, vote_average, votes_count FROM movies WHERE kind = $1 AND LOWER(name) LIKE $2 ORDER BY date LIMIT 5";
    const value = ["movie", `%${lowerCaseInput}%`];

    if(searchString === 'q'){
        console.log('Quit Successfully')
        await client.end();
    }

    const res = await client.query(text,value);
    console.table(res.rows);
    await client.end();
}

excecute()