//route for creating a new post
const router = require("express").Router();
const postsController = require("../../controllers/postController");

router.route("/")
    .get(postsController.findAll) //username already taken
    .post(postsController.create); //sign up

router.route("/:id")
    .get(postsController.findById) //log in
    .put(postsController.update) //update password/ whatever
    .delete(postsController.delete); //delete account

module.exports = router;
