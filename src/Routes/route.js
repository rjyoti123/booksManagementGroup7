const express = require('express');
const router = express.Router();

// __________________________________|| CONTROLLERS ||__________________________________

const bookController = require("../controllers/bookController.js")        
const reviewController = require("../controllers/reviewController.js")    
const userController = require("../controllers/userController.js")       

//__________________________________-|| MIDDLEWARE ||___________________________________

const {Authentication,Authorisation} = require("../middleware/auth")

// __________________________________|| USER ||__________________________________

router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)

// __________________________________|| BOOK ||__________________________________

router.post("/books", Authentication,Authorisation, bookController.createBooks)

//router.get("/books", Authentication, bookController.getBookswithquery)

//router.get("/books/:bookId", Authentication, bookController.getBookById)

//router.put("/books/:bookId",Authentication,authorization, bookController.updateBookById)

//router.delete("/books/:bookId",Authentication,authorization ,bookController.deleteBookById)

// __________________________________-|| REVIEW ||__________________________________

//router.post("/books/:bookId/review", reviewController.createReview)

//router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)

//router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

// __________________________________-|| ROUTER Export ||__________________________________-
  

module.exports = router;