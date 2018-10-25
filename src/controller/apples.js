var express = require('express');
var router = express.Router();
var constants = require('../lib/constants');

var apples = new Map();

router.get('/', function (req, res) {
    res.send(JSON.stringify(apples));
});

router.post('/', function (req, res) {
    var message = constants.APPLE_ADDED;
    var isError = true;

    try {
        var weight = req.body ? parseInt(req.body.weight) : null;
        var name = req.body ? req.body.name : null;

        if (weight && name) {
            var apple = apples.get(weight);
            if (apple) {
                message = constants.APPLE_EXIST;
            } else {
                isError = false;
                apples.set(weight, name);
            }
        } else {
            message = constants.APPLE_PROPERTIES;
        } 
    } catch(e) {
        message = e.message;
    } finally {
        doneMessage(res, message, isError);
    }
});

router.delete('/:weight', function (req, res) {
    var message = constants.APPLE_DELETED;
    var isError = true;

    try {
        var appleWeight = parseInt(req.params.weight);
        
        if (!isNaN(appleWeight)) {
            isError = false;
            apples.delete(appleWeight);
        } else {
            message = constants.APPLE_INCORRECT_WEIGHT;
        }
    } catch(e) {
        message = e.message;
    } finally {
        doneMessage(res, message, isError);
    }
    
});

router.put('/', function (req, res) {
    // TODO
    res.send({});
});

function doneMessage(res, message, isError) {
    if (isError) {
        res.status(400).send({
            error: message
        });
    } else {
        res.send({
            message: message
        });
    }
}

module.exports = router;