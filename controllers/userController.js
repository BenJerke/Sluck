const db = require ("../models")


module.exports = {
    findAllUsers: function(req, res) {
        console.log("finding all users");
        db.User
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    findUserById: function (req, res){
        console.log("finding user by id");
        db.User
            .find(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    createUser: function(req, res){

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf && (req.body.password === req.body.passwordConf)){
          
            let userData = {
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
            res.status(400).send("Passwords don't match.")
        }   
    },

    login: function(req , res){
        if (req.body.username && 
            req.body.password){

        let userLogin = req.body.username;

        db.User.findOne({ username: userLogin })
        .exec(function (err, user) {
          if (err) {
            return callback(err)
          } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
          }
          bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
              return callback(null, user);
            } else {
              return callback();
            }
          })
        });
        } else {
            res.status(422).send("Please enter a username and password.")
        };
    }, 

    updateUser: function (req, res){
        console.log("updating user")
        db.User
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    deleteUser: function (req, res){
        console.log("deleting user")
        db.User
            .findById({ _id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
};
