 const express=require('express');
 const {getPosts,
 	    createPost,
 	    postsByUser,
 	    postById,
 	    isPoster,
 	    updatePost,
 	    deletePost,
 	    photo,
 	    singlePost,
 	    like,
 	    unlike,
 	    comment,
 	    uncomment
 	} =require('../controllers/post');
  const {userById} =require('../controllers/user')
 const {requireSignin} =require('../controllers/auth')
 const {createPostValidator}=require('../validator') //We need not give index file here becoz it automatically loads becoz it is index.js

 const router=express.Router();
 router.get('/posts',getPosts);

 //Like and unlike
 router.put('/post/like', requireSignin, like);
 router.put('/post/unlike', requireSignin, unlike);

 //comments
 router.put('/post/comment', requireSignin, comment);
 router.put('/post/uncomment', requireSignin, uncomment);


 router.post('/post/new/:userId', requireSignin, createPost, createPostValidator); //Only after validation it goes to the create post
 router.get('/posts/by/:userId', requireSignin, postsByUser);
 router.get('/post/:postId',singlePost);
 router.put('/post/:postId', requireSignin, isPoster, updatePost);
 router.delete('/post/:postId', requireSignin, isPoster, deletePost);
 
 //photo
 router.get("/post/photo/:postId", photo);



 // Any route containing :userId our app will first execute userById()
 router.param("userId",userById);
 // Any route containing :postId our app will first execute postById()
 router.param("postId",postById);

 module.exports=router;
 