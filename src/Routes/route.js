const express = require('express');
const router = express.Router();

// __________________________________|| CONTROLLERS ||__________________________________

const bookController = require("../controllers/bookController.js")        
const reviewController = require("../controllers/reviewController.js")    
const userController = require("../controllers/userController.js")       

//__________________________________-|| MIDDLEWARE ||___________________________________

const {Authentication,Authorisation} = require("../middleware/middleware.js")

// __________________________________|| USER ||__________________________________

router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)

// __________________________________|| BOOK ||__________________________________

router.post("/books", Authentication, Authorisation, bookController.createBooks)

router.get("/books", Authentication, bookController.getBooks)

router.get("/books/:bookId", Authentication, bookController.getBookById)

router.put("/books/:bookId", Authentication, Authorisation, bookController.updateBook)

router.delete("/books/:bookId", Authentication, Authorisation, bookController.deleteBook)

// __________________________________-|| REVIEW ||__________________________________

router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

// __________________________________-|| ROUTER Export ||__________________________________-
  

module.exports = router;