const bookModel = require('../Models/bookModel')
const reviewModel = require('../Models/reviewModel')
const { isValid,
    isValidMobileNo,
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidObjectId}=require('../Validations/validator')


const getBookswithquery = async (req, res) => {
try{
const query = req.query
let { userId, category, subcategory} = query
let findBook = {isDeleted:false}
if(userId){
    if(!isValidObjectId(userId)) return res.status(400).json({status :false,message:"Please enter valid objectId"})
    findBook.userId= userId
}
if(Object.keys(query).length===0) return res.status(400).send({status:false,message:"query is required"})
if(category){
    findBook.category=category
}
if(subcategory){
    findBook.subcategory=subcategory
}
let getBookByQuery = await bookModel.find(findBook).select({ title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 })
if (getBookByQuery.length == 0) return res.status(404).json({ status: false, message: "Book data is not exist" })
const sortBook = getBookByQuery.sort((a, b) => a.title.localeCompare(b.title))
res.status(200).send({ status: true,data: sortBook })
}
catch(err){
return res.status(500).send({status :false,message:err.message})
}
}
module.exports.getBookswithquery=getBookswithquery

const getBookwithparaams = async (req,res)=>{
    try{
        const bookId = req.params.bookId
        const books = await bookModel.findOne({_id:bookId,isDeleted:false}).select({ deletedAt: 0, ISBN: 0, __v: 0 })
        if(!books) return res.status(404).json({status:false,message:"book not found"})
        const review = await reviewModel.find({bookId:bookId,isDeleted:false}).select({ __v: 0, updatedAt: 0, createdAt: 0, isDeleted: 0 })
        
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}
//const bookModel = require('../models/bookModel')
// const userModel = require('../models/userModel')
// const mongoose = require('mongoose')

const createBooks = async function (req, res) {
    try {
        const data = req.body
        let { title, excerpt, userId, category, subcategory, ISBN } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "body should be present" })
        if (!title) return res.status(400).send({ status: false, message: "title is required" })
        const titleUnique = await bookModel.findOne({ title: title })
        if (titleUnique) return res.status(400).send({status:false,msg:"title already exist"})
        if(!excerpt) return res.status(400).send({status:false,msg:"excrept is required"})
        if(!userId) return res.status(400).send({status:false,msg:"userId is required"})

     if(!ISBN) return res.status(400).send({status:false,msg:"ISBN code is required"})

        const ISBNunique = await bookModel.findOne({ISBN:ISBN})
        if(ISBNunique) return res.status(400).send({status:false,msg:"ISBN is already exist"})
        if(!category) return res.status(400).send({status:false,msg:"category is required"})
        if(!subcategory) return res.status(400).send({status:false,msg:"subcategory is required"})
        const saveData = await bookModel.create(data)
        return res.status(201).send({status:true,data:saveData})
    }
    catch (error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const updateBookById = async function (req, res) {
    try {

        let bookId = req.params.bookId
        let { title, excerpt, releasedAt, ISBN } = req.body
//validation
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter the data in the request body to update" })
        }

        let uniqueTitle = await bookModel.findOne({ title: title })
        if (uniqueTitle) {
            return res.status(400).send({ status: false, message: "title already exists" })
        }
        let uniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (uniqueISBN) {
            return res.status(400).send({ status: false, message: "ISBN already exists" })
        }

       
        let updatedData = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            {
                title: title,
                excerpt: excerpt,
                releasedAt: releasedAt,
                ISBN: ISBN,
            },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "Data updated successfully", data: updatedData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        let deleteBook = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "deletion successful", data: deleteBook })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}











module.exports.createBooks=createBooks
module.exports.updateBookById=updateBookById
module.exports.deleteBookById=deleteBookById












// // const findBook  =  await  find(query,{isDeleted:false})
// // if(!findBook) return res.status(404).json({status:false,message:"Does not exist"})


// const book = require("../models/bookModel");
// const user = require("../models/userModel");
// const validator = require("../Validations/validator");

// const createBook = async (req, res) => {
//   try {
//     let bookData = req.body;
//     let { title, userId, ISBN, category, subcategory, excerpt, releasedAt } =
//       bookData;

//     if (!validator.isValid(title)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Title Must be Present" });
//     }

//     let isUniqueTitle = await book.findOne({ title: title });
//     if (isUniqueTitle) {
//       return res
//         .status(400)
//         .send({ status: false, message: "this title is being used" });
//     }

//     if (!excerpt) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Excerpt Must be Present" });
//     }

//     if (!validator.isValidObjectId(userId)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "This is not a valid user id" });
//     }

//     let findUser = await user.findOne({ _id: userId });
//     if (validator.isValid(findUser)) {
//       return res
//         .status(404)
//         .send({ status: false, message: "User with this Id does not exist" });
//     }

//     if (!validator.isUniqueISBN(ISBN)) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide a valid isbn number",
//       });
//     }

//     let isUniqueISBN = await book.findOne({ ISBN: ISBN });

//     if (isUniqueISBN) {
//       return res
//         .status(400)
//         .send({ status: false, message: "This ISBN is already being used" });
//     }

//     if (!category) {
//       return res
//         .status(400)
//         .send({ status: false, message: "category is a required field" });
//     }

//     if (!subcategory) {
//       return res
//         .status(400)
//         .send({ status: false, message: "subcategory is can not be empty" });
//     }

//     if (!validator.isValidDate(releasedAt)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Date format is not valid" });
//     } //'2000-07-20'

//     let saveBook = await book.create(bookData);
//     return res.status(201).send({
//       status: true,
//       message: "you book has been saved",
//       data: saveBook,
//     });
//   } catch (err) {
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };

// const getBook = async (req, res) => {
//   try {
//     let data = req.query;
//     let { userId, category, subcategory } = data;
//     let filter = {
//       isDeleted: false,
//       ...data,
//     };

//     if (!validator.isValidObjectId(userId)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "this is not a valid user Id" });
//     }

//     let findbyUserId = await book.findOne({ userId });
//     if (!findbyUserId) {
//       return res
//         .status(404)
//         .send({ status: false, message: "no books with this userId exists" });
//     }

//     if (category) {
//       let findbyCategory = await book.findOne({ category: category });
//       if (!findbyCategory) {
//         return res.status(404).send({
//           status: false,
//           message: "no books with this category exists",
//         });
//       }
//     }

//     if (subcategory) {
//       let findbysubcategory = await book.findOne({ subcategory: subcategory });
//       if (!findbysubcategory) {
//         return res.status(404).send({
//           status: false,
//           message: "no books with this subcategory exists",
//         });
//       }
//     }

//     let findBook = await book
//       .find(filter)
//       .select({
//         _id: 1,
//         title: 1,
//         excerpt: 1,
//         userId: 1,
//         category: 1,
//         releasedAt: 1,
//         reviews: 1,
//       })
//       .sort({ title: 1 });

//     if (!findBook) {
//       return res
//         .status(404)
//         .send({ status: false, message: "No books with this query exists" });
//     } else {
//       return res
//         .status(200)
//         .send({ status: true, message: "Book List", data: findBook });
//     }
//   } catch (err) {
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };

// module.exports = { createBook, getBook };
