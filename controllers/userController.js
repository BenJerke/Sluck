const db = require ("../models")

module.exports = {
    findAll: function(req, res) {
        console.log("finding all users");
        db.User
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    findById: function (req, res){
        console.log("finding user by id");
        db.User
            .find(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    create: function(req, res){

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf && (req.body.password === req.body.passwordConf)){
          
            var userData = {
              email: req.body.email,
              username: req.body.username,
              password: req.body.password,
              passwordConf: req.body.passwordConf,
            }
            console.log("user creation initiated")
            console.log(userData)
        db.User
            .create(userData)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
        } else {
            res.send("Passwords don't match.")
        }   
    },

    update: function (req, res){
        console.log("updating user")
        db.User
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    delete: function (req, res){
        console.log("deleting user")
        db.User
            .findById({ _id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
};
