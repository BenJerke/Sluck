//route for creating a new post
const router = require("express").Router();
const channelsController = require("../../controllers/channelController");

router.route("/")
    .get(channelsController.findAll) //username already taken
    .post(channelsController.create); //sign up

router.route("/:id")
    .get(channelsController.findById) //log in
    .put(channelsController.update) //update password/ whatever
    .delete(channelsController.delete); //delete account

module.exports = router;
