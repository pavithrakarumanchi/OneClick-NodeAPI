const express=require('express')
 const {signup,signin,signout,forgotPassword,resetPassword, socialLogin} =require('../controllers/auth')
 const {userById} =require('../controllers/user')
 const {userSignupValidator, passwordResetValidator}=require('../validator') //We need not give index file here becoz it automatically loads becoz it is index.js

 const router=express.Router();
 
 router.post('/signup', userSignupValidator, signup); //Only after validation it goes to the create post
 router.post('/signin', signin);
 router.get('/signout', signout);

 // password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// then use this route for social login
router.post("/social-login", socialLogin);

 // Any route containing userId our app will first execute userById()
 router.param("userId",userById)

 module.exports=router; 
 