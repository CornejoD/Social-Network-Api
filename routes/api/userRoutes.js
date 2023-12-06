const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    userCreation,
    deleteUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(userCreation);

router.route("/:userId").get(getSingleUser).delete(deleteUser);

module.exports = router;