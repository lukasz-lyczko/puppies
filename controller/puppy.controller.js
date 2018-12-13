const db = require('../config/db.config.js');
const Puppy = db.pups;

// Post a Puppy
exports.create = (req, res) => {
    // Save to PostgreSQL database
    Puppy.create({
            'name': req.body.name,
            'breed': req.body.breed,
            'age': req.body.age,
            'sex': req.body.sex,
        },
        {fields: ['id', 'name', 'breed', 'age', 'sex']}).then(puppy => {
        // Send created customer to client
        res.json(puppy);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

// FETCH All Puppies
exports.findAll = (req, res) => {
    Puppy.findAll().then(puppies => {
        // Send All Puppies to Client
        res.json(puppies.sort(function (c1, c2) {
            return c1.id - c2.id
        }));
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

// Find a Puppy by Id
exports.findOne = (req, res) => {
    Puppy.findOne(
        {
            where: {id: req.params.id},
            attributes: ['id', 'name', 'breed', 'age', 'sex']
        }).then(puppy => {
        res.json(puppy);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};