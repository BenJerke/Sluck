//route for creating a new user record
const router = require("express").Router();
const usersController = require("../../controllers/userController");

router.route("/")
    .get(usersController.findAllUsers) //username already taken
    .post(usersController.createUser); //sign up

router.route("/:id")
    .get(usersController.findUserById) //log in
    .put(usersController.updateUser) //update password/ whatever
    .delete(usersController.deleteUser); //delete account

module.exports = router;
