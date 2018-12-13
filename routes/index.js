var express = require('express');
var router = express.Router();

var db = require('../queries');
const puppies = require('../controller/puppy.controller');


router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);

router.get('/api/v2/puppies/:id', puppies.findOne);
router.post('/api/v2/puppies', puppies.create);
router.get('/api/v2/puppies', puppies.findAll);
module.exports = router;
