const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const q = await Model.find({}).exec();
        if (!q || q.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({ 'code': req.params.tripCode }).exec();
        if (!q || q.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// POST: /trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

    try {
        const q = await newTrip.save();
        if (!q) {
            return res.status(400).json({ message: "Error adding trip" });
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json({ message: "Error adding trip", error: err });
    }
};

// PUT: /trips/:tripCode - updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const q = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            },
            { new: true } // Return the updated document
        ).exec();

        if (!q) {
            return res.status(400).json({ message: "Error updating trip" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// Export the functions
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};
