const userModel = require('./userModel');
const key = '123456789trytryrtyr';
const encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = async (userDetails) => {
  try {
    var userModelData = new userModel();

    userModelData.firstname = userDetails.firstname;
    userModelData.lastname = userDetails.lastname;
    userModelData.email = userDetails.email;

    // Vérifiez si userDetails.password est défini avant de l'encrypter
    if (userDetails.password) {
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;

      await userModelData.save();
      console.log("User saved successfully");
      return true;
    } else {
      console.error("Error: Password is undefined");
      throw new Error("User password is undefined");
    }
  } catch (error) {
    console.error("Error in createStudentDBService:", error);
    return false;
  }
}




module.exports.loginuserDBService = async (userDetails) => {
  try {
    const result = await userModel.findOne({ email: userDetails.email });

    if (!result) {
      throw { status: false, msg: "User Error Details" };
    }

    var decrypted = encryptor.decrypt(result.password);

    if (decrypted === userDetails.password) {
      return { status: true, msg: "User Validated Successfully" };
    } else {
      throw { status: false, msg: "User Validation Failed" };
    }
  } catch (error) {
    throw { status: false, msg: "Invalid Data" };
  }
}
