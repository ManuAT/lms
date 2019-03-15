var lms = require('./models/lms');

function getvalues(res) {
    lms.find(function (err, lmss) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(lmss); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/lms', function (req, res) {
        // use mongoose to get all todos in the database
        getvalues(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/lms', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        lms.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getvalues(res);
        });

    });

    // delete a todo
    app.delete('/api/lms/:todo_id', function (req, res) {
        lms.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getvalues(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
