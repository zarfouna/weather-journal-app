
   // Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require("cors");

// Enable All CORS Requests
app.use(cors());

//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Callback function to complete GET '/all'
const getAll = (req, res) => res.send(projectData);
// GET Route
app.get("/all", getAll);


// Callback function to complete POST '/add'
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
  }
// GET Route
app.post("/add", postData);

const port = 3000;
const hostname = "127.0.0.1";

// function to test the server 
const listening = () =>
console.log(`Server running at http://${hostname}:${port}/`);

// spin up the server
app.listen(port, listening);

// Setup Server