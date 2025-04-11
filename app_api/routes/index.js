const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define routes for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripsList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET and PUT Method routes tripsFindByCode and tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET Method to find trip by code
    .put(tripsController.tripsUpdateTrip); // PUT Method updates a trip

module.exports = router;
