const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');


dotenv.config();

console.log("ES_URI:", process.env.ES_URI);
console.log("ES_API_KEY:", process.env.ES_API_KEY ? "Loaded" : "Not Loaded");

const client = new Client({
  node: process.env.ES_URI, 
  auth: {
    apiKey: process.env.ES_API_KEY,
  },
});

module.exports = client;
