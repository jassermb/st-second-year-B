var userService = require('./userService.js');
var createUserControllerFn = async (req, res) => {
    try {
      console.log(req.body);
  
      // Vérifiez si le mot de passe est défini dans la demande
      if (!req.body.password) {
        res.status(400).send({ "status": false, "message": "Password is required" });
        return;
      }
  
      var status = await userService.createUserDBService(req.body);
      console.log(status);
  
      if (status) {
        res.send({ "status": true, "message": "User created successfully" });
      } else {
        res.send({ "status": false, "message": "Error creating user" });
      }
    } catch (err) {
      console.error("Error in createUserControllerFn:", err);
      res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
  }
  

var loginUserControllerFn = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFn,loginUserControllerFn };