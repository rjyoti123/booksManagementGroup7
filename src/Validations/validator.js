//_________ Import  ________________

const mongoose = require("mongoose");

//_________ Validations : Name  ________________

const isValidName = function (name) {
  const regexName = /^[a-zA-Z]+$/;
  return regexName.test(name);
};

//_________ Validations : Mobile No ________________

const isValidMobileNo = function (mobile) {
  const regexMob = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/g;
  return regexMob.test(mobile);
};

//_________ Validations : Email  ________________

const isValidEmail = function (email) {
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[com]+)$/;
  return regexEmail.test(email);
};

//_________ Validations : Password  ________________

const isValidPassword = function (password) {
  const passwordRegex =
    /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

//_________ Validations : ISBN  ________________

const isValidISBN = function (ISBN) {
  const isbnRegex =
  /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g;
  return passwordRegex.test(ISBN);
};

//_________ Validations : Date  ________________

const isValidDate = function (datePattern) {
  const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g;
  return dateRegex.test(datePattern);
};

//_________ Validations :  ObjectId ________________

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

//_________ Validations : Values ________________

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value == "String" && value.trim().length === 0) return false;
  return true;
};
//_________ Export : Modules  ________________

module.exports = {
  isValid,
  isValidISBN,
  isValidDate,
  isValidMobileNo,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidObjectId,
}