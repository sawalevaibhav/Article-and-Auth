const express = require('express')

// import from controller all https request

const { getAllarticle, createArticle, updateArticle, deleteArticle,findOne } = require('../controller/articlecontroller')
const isAunthenticatedUser= require('../mildeware/Auth')
const AuthorizeRole = require("../mildeware/AuthRole")





const  router = express.Router()


// router.route("/get/all/article").get(isAunthenticatedUser,getAllarticle)

router.route("/article").get(isAunthenticatedUser,getAllarticle)

router.route("/article").post(isAunthenticatedUser, AuthorizeRole("Admin"),createArticle)

router.route("/article/:id").put(isAunthenticatedUser,AuthorizeRole("Admin"),updateArticle)
.delete(isAunthenticatedUser,AuthorizeRole("Admin"),deleteArticle)


router.route("/article/:id").get(isAunthenticatedUser,findOne)






// router.route("/article/:id").get(updateArticle)







module.exports = router