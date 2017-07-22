const bodyParser = require('body-parser');
const exModel = require('./../models/expensesModel');

function getAllExpenses(callback) {
    exModel.find({} ,callback);
}

function getExpensesByMonthAndYear(month, year, callback){
    const lastDayOfTheMonth =  new Date(year, month, 0).getDate();
    //IDKY, but new Date(Y,M,D) bring the next month in the calander, probably becuse its starts with 0.
    month--;
    exModel.find({ "date" :  {"$gte": new Date(year, month, 1), "$lte": new Date(year, month,lastDayOfTheMonth )}} ,callback);

}

module.exports = {
    getAllExpenses: getAllExpenses,
    getExpensesByMonthAndYear :getExpensesByMonthAndYear
};

/*
function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/api/todos/:uname', function (req, res) {

        Todos.find({
            username: req.params.uname
        }, function (err, todos) {
            if (err) throw err;

            res.send(todos);
        });

    });

    app.get('/api/todo/:id', function (req, res) {

        Todos.findById({
            _id: req.params.id
        }, function (err, todo) {
            if (err) throw err;

            res.send(todo);
        });

    });

    app.post('/api/todo', function (req, res) {

        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todo) {
                if (err) throw err;

                res.send('Success');
            });
        } else {

            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function (err) {
                if (err) throw err;
                res.send('Success');
            });

        }

    });

    app.delete('/api/todo', function (req, res) {

        Todos.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            res.send('Success');
        })

    });

}*/