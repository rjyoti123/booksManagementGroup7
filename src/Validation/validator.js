//__________________________ Import  ___________________________________________

const mongoose=require('mongoose');

//__________________________ Validations : Name  ___________________________________________

const isValidName=function(name){
    const regexName=/^[a-zA-Z]+$/;;
    return regexName.test(name)
}

  //__________________________ Validations : Mobile No ___________________________________________

const isValidMobileNo=function(mobile){
    const regexMob=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/g;
    return regexMob.test(mobile);
}

//__________________________ Validations : Email  ___________________________________________

const isValidEmail=function(email){
    const regexEmail=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[com]+)*$/
    return regexEmail.test(email)
}

//__________________________ Validations : Password  ___________________________________________

const isValidPassword = function (password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  //__________________________ Validations : Values ___________________________________________
  
  const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value == "string" && value.trim().length === 0) return false;
    return true;
  };
  
  //__________________________ Validations :  ObjectId ___________________________________________
  
  const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };
  
  //__________________________ Export : Modules  ___________________________________________
  
  module.exports = {
    isValid,
    isValidMobileNo,
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidObjectId,
  };