var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'puppies',
    user: 'postgres',
    password: 'Lv&5.NAW\\Gjwu/KSp5i%P59@p'
};
// var connectionString = 'postgres://postgres:Lv&5.NAW\\Gjwu/KSp5i%P59@p@localhost:5432/puppies';
var db = pgp(cn);

// add query functions
function getAllPuppies(req, res, next) {
    db.any('SELECT * FROM pups')
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(err => {
            return next(err)
        });
}

function getSinglePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('SELECT * FROM pups WHERE id = $1', pupID)
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE puppy'
                });
        })
        .catch(err => {
            return next(err)
        });
}

function createPuppy(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('INSERT INTO pups(name, breed, age, sex) VALUES (${name}, ${breed}, ${age}, ${sex})',
        req.body)
        .then(() => {
            res.status(201)
                .json({
                    status: 'success',
                    data: req.body,
                    message: 'Inserted one puppy'
                });
        })
        .catch(err => {
            return next(err)
        });
}

async function updatePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    try {
        var pupData = await db.one('SELECT * FROM pups WHERE id = $1', pupID);
    } catch (err) {
        if (!pupData) {
            res.status(404).send({error: 'Puppy with id: ' + pupID + ' not found'});
            return
        } else {
            return next(err)
        }
    }

    db.none('UPDATE pups SET name=$1, breed=$2, age=$3, sex=$4 WHERE id=$5',
        [req.body.name || pupData.name, req.body.breed || pupData.breed, parseInt(req.body.age) || pupData.age,
            req.body.sex, parseInt(req.params.id)])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    data: req.body,
                    message: 'Updated puppy'
                });
        }).catch(err => {
        return next(err)
    });
}

module.exports = {
    getAllPuppies: getAllPuppies,
    getSinglePuppy: getSinglePuppy,
    createPuppy: createPuppy,
    updatePuppy: updatePuppy,
    // removePuppy: removePuppy
};