# WTWR (What to Wear?): Back End
[Link to front end](https://github.com/Meidoragon/se_project_react)

## Overview
 * Intro
 * Technologies used
 * Dependencies
 * Setup
 * Running

## Intro
  This is the back end portion of WTWR, a web app designed to suggest clothing to wear based off of the weather.

## Technologies used
  * Express.js for handling a lot of the core parsing and routing. 
  * helmet.js in order to set HTTP response headers and improve security.
  * mongoose.js to handle the interactions between this application and the database. 
  * validator.js for validating user input.
  

## Dependencies
  * Node.js v. .10 or greater
  * MongoDB v. 5.0.*. Newer versions may work, but are untested.

## Setup
  1. Install the requisite versions of Node.js and MongoDB and start MongoDB.
  2. Clone the repository with `git clone https://github.com/Meidoragon/se_project_react.git`     
  3. Ports and database names are set to sensible defaults, but can be modified in `package.json`

## Running 
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

