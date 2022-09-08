const express = require('express');
const router = express.Router();

/*  api:     /user/add      */
var userController = require("../app/controller/UserController");
const middlewareController =require("../app/controller/middlewareController")

// REGISTER
router.post("/register", userController.registerUser); 

// LOGIN
router.post("/login",userController.loginUser);

//GET ALL USER
// router.get("/all",middlewareController.verifyTokenAndAdmin , userController.getUsers); 
router.get("/all", userController.getUsers); 


// GET 1 USER
router.get("/:userName", userController.getUser); //truyền userName lên params

//UPDATE USER
router.put("/update/:userId",userController.updateUser);

router.delete("/delete",userController.deleteUser);  //truyền {userName: "..."}
// router.post("/logout", middlewareController.verifyToken, userController.logOut);
router.post("/logout",  userController.logOut);

module.exports = router;