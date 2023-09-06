const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, getUsers,forgetPassword,confimCode,changePassword, getUserById, login } = require('./user.controller');

router.post("/", createUser);
router.get("/all", getUsers);
router.get("/", auth, getUserById);
router.post("/login",login);
router.post('/forgetpassword ',forgetPassword)
router.post('/confimCode', confimCode)
router.post('/changePassword', changePassword)

module.exports = router;