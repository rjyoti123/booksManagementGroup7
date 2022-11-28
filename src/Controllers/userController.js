const userModel = require("../Models/userModel");
const bookModel = require("../Models/bookModel");
const reviewModel = require("../Models/reviewModel");
const validator = require("../Validations/validator");

const createUser = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "please input user Details" });
    }

    const { title, name, phone, email, password } = data;

    if (!validator.isValid(title)) {
      return res.status(400).send({ status: false, msg: " title is required" });
    }

    if (title == "Mr" || title == "Mrs" || title == "Miss") {
      if (!validator.isValidName(name)) {
        return res
          .status(400)
          .send({ status: false, msg: " name is required" });
      }

      if (!validator.isValid(phone)) {
        return res
          .status(400)
          .send({ status: false, msg: " phone no. is required" });
      }

      if (!validator.isValidMobileNo(phone)) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "phone number must be start from 6,7,8,9",
          });
      }

      const isMobileAlreadyUsed = await userModel.findOne({ phone });
      if (isMobileAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, msg: "phone no already registered" });
      }

      if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, msg: " email is required" });
      }

      if (!validator.isValidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, msg: "Invalid format of email" });
      }

      const isEmailAlreadyUsed = await userModel.findOne({ email });
      if (isEmailAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, msg: "email already registered" });
      }

      if (!validator.isValid(password)) {
        return res
          .status(400)
          .send({ status: false, msg: " password is required" });
      }

      if (password.length < 8 || password.length > 15) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "the length of password must be min:- 8 or max: 15",
          });
      }

      let userdata = await userModel.create(data);

      return res
        .status(201)
        .send({
          status: true,
          msg: "User succesfully created",
          data: userdata,
        }); //
    } else {
      return res
        .status(400)
        .send({ status: false, msg: " title is only contain Mr, Mrs, Miss" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "error", error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email) {
        return res.status(400).send({status : false, message : "email is required"});
      }
  
      if (!password) {
        return res.status(400).send({status : false, message : "password is required"});
      }
  
      if (!validator.isValidEmail(email)) {
        return res.status(400).send({status : false, message : "this is not a valid email"});
      }

      if (!validator.isValidPassword(password)) {
        return res.status(400).send({status : false, message : "this is not a valid email"});
      }
  
      let findUser = await user.findOne({ email });
      if (!findUser) return res.status(404).send({status : false, message : "no user with this email exists"});
  
      let verifyUser = await user.findOne({ email: email, password: password });
      if (!verifyUser) return res.status(400).send({status : false, message : "password are wrong"});
        
      let payload = {
        userId: findUser._id,
        iat: Math.floor(Date.now())
      }
  
      let token = jwt.sign( payload, "secretKey", {
        expiresIn : '30m'
      });
  
      res.setheader("x-auth-key", token);
      res
        .status(200)
        .send({ status: true, message: "login successful", data: {token} });
    } catch (err) {
      res.status(500).send({ status: false, err: err.msg });
      console.log(err)
    }
  };
  
  
  module.exports = {createUser,loginUser}