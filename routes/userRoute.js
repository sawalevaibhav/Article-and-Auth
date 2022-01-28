
const express = require('express')
const { registerUser, loginUser, logoutUser, getRegisterdata,findOne, deleteUser } = require('../controller/userController')

const isAunthenticatedUser= require('../mildeware/Auth')
const AuthorizeRole = require("../mildeware/AuthRole")



const router = express.Router()



router.route("/userdata").post(registerUser)
router.route("/userdata").get(isAunthenticatedUser, AuthorizeRole("Admin"),getRegisterdata)

router.route("/userdata/:id").get(isAunthenticatedUser, AuthorizeRole("Admin"),findOne).delete(isAunthenticatedUser, AuthorizeRole("Admin"),deleteUser)  







//  login and logout User
router.route("/loginuser").post(loginUser)
router.route("/logoutuser").get(logoutUser)




module.exports = router