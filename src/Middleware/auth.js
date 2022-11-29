const jwt = require('jsonwebtoken')
const userModel = require('../Models/userModel')
const Authentication = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key']
        if (!token) { return res.status(400).send({ status: false, message: "Token must be Present." }) }

        //=====================Verify token & asigning it's value in request body =====================//
        jwt.verify(token, "secretKey", function (error, decodedToken) {
            if (error) {
                return res.status(401).send({ status: false, message: "Invalid Token." })
            } else {
                req.token = decodedToken
               return  next()
            }
            
        } )

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message })
    }

}

const Authorisation = async (req, res, next) => {

    try {

        //<<<===================== Authorising with BookId From Param =====================>>>//
        let bookIdFromParams = req.params.bookId
        if (bookIdFromParams) {

            if (!ObjectId.isValid(bookIdFromParams)) { return res.status(400).send({ status: false, message: `This UserId: ${bookIdFromParams} is not Valid.` }) }

            const checkBookId = await bookModel.findOne({ _id: bookIdFromParams, isDeleted: false })
            if (!checkBookId) { return res.status(404).send({ status: false, message: `This BookId: ${bookIdFromParams} is not Exist! or Already been Deleted.` }) }

            if (checkBookId['userId'].toString() !== req.token.payload.userId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access!" })
            }

            return next()
        }


        //<<<===================== Authorising with UserId form Body =====================>>>//
        let data = req.body

        let { userId } = data

      
        const checkUserId = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!checkUserId) { return res.status(400).send({ status: false, message: `This UserId: ${userId} is not Exist.` }) }

        if (checkUserId['_id'].toString() !== req.token.payload.userId) {
            return res.status(403).send({ status: false, message: "Unauthorized User Access!" })
        }

        next()

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message })
    }

}
module.exports.Authentication=Authentication

module.exports.Authorisation=Authorisation