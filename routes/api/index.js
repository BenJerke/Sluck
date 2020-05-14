const router = require("express").Router();
const userRoutes = require("./users");
const postRoutes = require("./posts");
const channelRoutes = require("./channels");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/channels", channelRoutes);

module.exports = router;
