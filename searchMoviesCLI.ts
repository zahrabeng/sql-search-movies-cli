import { question } from "readline-sync";
import { Client } from "pg";
const readlineSync = require('readline-sync');

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name.
const client = new Client({ database: 'omdb' });
console.log("Welcome to search-movies-cli!");


const searchString = readlineSync.question("Search for what movie? ('q' to quit)")

async function excecute (){
    if (readlineSync.keyIn)
    await client.connect();
    const text = "SELECT id, name, date, runtime, budget, revenue, vote_average, votes_count FROM movies WHERE kind = $1 AND name LIKE $2 LIMIT 5";
    const value = ["movie", `%${searchString}%`];

    const res = await client.query(text,value);
    console.table(res.rows);
    await client.end();
}

excecute()