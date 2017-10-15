var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/m');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Conntected To Mongo Database');
});
var user = require('./models/inventory');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});


router.route('/user')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {

        var user = new user(); // create a new instance of the Bear model
        user.name = req.body.name; // set the bears name (comes from the request)

        // save the bear and check for errors
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Bear created!'
            });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        user.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);