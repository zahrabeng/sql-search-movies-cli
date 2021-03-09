import { question } from "readline-sync";
import { Client } from "pg";
const client = new Client({ database: 'omdb' });
console.log("Welcome to search-movies-cli!");