const bodyParser = require('body-parser');
const incModel = require('./../models/incomesModel');

function setIncModelObjByParams(params){
    return new incModel({
        date: Date.parse( params.date),
        category: params.category,
        store: params.store,
        what: params.what,
        how_much: params.how_much,
        who: params.who,
        how: params.how,
        constant: params.constant || false
    });
}

function getAllIncomes(callback) {
    incModel.find({}, callback);
}

function getIncomesByMonthAndYear(month, year, callback) {
    const lastDayOfTheMonth = new Date(year, month, 0).getDate();
    //IDKY, but new Date(Y,M,D) bring the next month in the calander, probably becuse its starts with 0.
    month--;
    incModel.find({
        "date": {
            "$gte": new Date(year, month, 1),
            "$lte": new Date(year, month, lastDayOfTheMonth)
        }
    }, callback);
}

function postNewIncome(params, callback) {
    var newIncome =  setIncModelObjByParams(params);
    newIncome.save(callback);
}

function updateIncome(params, callback) {
    var updateIncome = setIncModelObjByParams(params);
    updateIncome._id = params._id;
    incModel.findByIdAndUpdate(params._id, updateIncome , callback);
}

function deleteIncome(id, callback){
    incModel.remove(id, callback);
}

module.exports = {
    getAllIncomes: getAllIncomes,
    getIncomesByMonthAndYear: getIncomesByMonthAndYear,
    postNewIncome: postNewIncome,
    updateIncome :updateIncome,
    deleteIncome:deleteIncome
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