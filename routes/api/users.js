//route for creating a new user record
const router = require("express").Router();
const usersController = require("../../controllers/userController");

router.route("/")
    .get(usersController.findAll) //username already taken
    .post(usersController.create); //sign up

router.route("/:id")
    .get(usersController.findById) //log in
    .put(usersController.update) //update password/ whatever
    .delete(usersController.delete); //delete account

module.exports = router;
