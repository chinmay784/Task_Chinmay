const express = require("express");
const { userAuthMiddelwere } = require("../middelwere/userMiddelWere");
const { createPost, getAllPost, getOnePost, deletePost, likePost, Comments, deleteComment } = require("../controllers/PostConTroller");
const router = express.Router();

router.post("/createPost",userAuthMiddelwere, createPost);
router.get("/getAllPost",userAuthMiddelwere,getAllPost);
router.get("/getonePost/:userId/postid/:postId",userAuthMiddelwere,getOnePost);
router.delete("/deletePost/:userId/postid/:postId",userAuthMiddelwere, deletePost);
router.post("/likePost/:userId/postid/:postId",userAuthMiddelwere,likePost);
router.post("/comments/:userId/postid/:postId", userAuthMiddelwere, Comments);
router.delete("/deleteComment/:postId/commentid/:commentId",userAuthMiddelwere, deleteComment)


module.exports = router;

// APi for create post
// http://localhost:5000/api/post/createPost (POST) (in body pass {image,text} and also pass token in header)
// APi for get all post
// http://localhost:5000/api/post/getAllPost (GET) (in header pass token)
// APi for get one post
// http://localhost:5000/api/post/getonePost/:userId/postid/:postId (GET) (in header pass token and also pass userId and postId in url)
// APi for delete post
// http://localhost:5000/api/post/deletePost/:userId/postid/:postId (DELETE) (in header pass token and also pass userId and postId in url)
// APi for like post
// http://localhost:5000/api/post/likePost/:userId/postid/:postId (POST) (in header pass token and also pass userId and postId in url)
// APi for comments
// http://localhost:5000/api/post/comments/:userId/postid/:postId (POST) (in header pass token and also pass userId and postId in url and in body pass {text})
// APi for delete comment
// http://localhost:5000/api/post/deleteComment/:postId/commentid/:commentId (DELETE) (in header pass token and also pass postId and commentId in url)
