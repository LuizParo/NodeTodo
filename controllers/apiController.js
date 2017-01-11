var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.get('/api/todos/:username', function(req, res) {
        Todos.find({username : req.params.username}, function(err, results) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.send(results);
        });
    });

    app.get('/api/todo/:id', function(req, res) {
        Todos.findById({_id : req.params.id}, function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.send(result);
        });
    });

    app.post('/api/todos', function(req, res) {
        var todo = req.body;

        if(todo.id) {
            Todos.findByIdAndUpdate({_id : todo.id}, {
                todo : todo.todo,
                isDone : todo.isDone,
                hasAttachment : todo.hasAttachment
            }, function() {
                if(err) {
                    console.log(err);
                    res.status(500).json(err);
                    return;
                }

                res.sendStatus(204);
            });
            return;
        }

        var newTodo = Todos({
            username : 'test',
            todo : todo.todo,
            isDone : todo.isDone,
            hasAttachment : todo.hasAttachment
        });

        newTodo.save(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.location(`/api/todo/${result._id}`);
            res.status(201).json(result);
        });
    });

    app.delete('/api/todos/:id', function(req, res) {
        Todos.findByIdAndRemove(req.params.id, function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.sendStatus(204);
        });
    });
};