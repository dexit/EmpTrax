// Require necessary modules and files
const inquirer = require('inquirer');
const { connection } = require('./db/connection');
const { mainMenu } = require('./views/view');

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  // Call the main menu function to start the application
  mainMenu();
});

// Handle errors and close the database connection on exit
process.on('exit', () => {
  console.log('Closing the database connection...');
  connection.end();
});