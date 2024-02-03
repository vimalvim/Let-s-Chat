const {register, login, setAvatar, getAllUsers, checkUserExists} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login", login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);
router.get("/checkUserExists", checkUserExists);

module.exports = router;