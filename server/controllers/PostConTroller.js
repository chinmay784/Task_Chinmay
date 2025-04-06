const PostModel = require("../models/PostModel");


exports.createPost = async (req, res) => {
    try {
        const { text, image } = req.body;
        const userId = req.user.userId;
        if (!text || !image) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        let user = await PostModel.findOne({ userId });


        user = new PostModel({
            userId,
            text,
            image,
        })

        await user.save();


        return res.status(200).json({
            success: true,
            message: "Post Created Successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating post",
        })
    }
}



exports.getAllPost = async (req, res) => {
    try {
        const allPost = await PostModel.find();
        return res.status(200).json({
            success: true,
            message: "All Posts",
            allPost
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting posts",
        })

    }
}




exports.getOnePost = async (req, res) => {

    try {

        const { userId, postId } = req.params;

        if (!postId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }


        const user = await PostModel.findById(userId);
        if (!user) {
            const post = await PostModel.findById(postId)

            return res.status(200).json({
                success: true,
                message: "Post Found",
                post
            })
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting posts",
        })

    }
};





exports.deletePost = async (req, res) => {
    try {

        const { userId, postId } = req.params;
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const user = await PostModel.findById(userId);
        if (!user) {
            const deleteId = await PostModel.findByIdAndDelete(postId)


            return res.status(200).json({
                success: true,
                message: "Post Deleted Successfully",
                deleteId
            })
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting posts",
        })
    }
}


exports.likePost = async (req, res) => {
    try {
        const { userId, postId } = req.params;

        if (!userId || !postId) {
            return res.status(400).json({
                success: false,
                message: "Please provide userId and postId"
            })
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }
        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }
        await post.save();

        return res.status(200).json({
            successt: true,
            message: alreadyLiked ? "Post unliked" : "Post liked",
            post
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in likeing post"
        })
    }
}




exports.Comments = async (req, res) => {
    try {

        const { userId, postId } = req.params;

        const { comment } = req.body;

        if (!userId || !postId || !comment) {
            return res.status(500).json({
                sucess: false,
                message: "Please Provide all fildes"
            })
        }

        const user = await PostModel.findById(userId);
        if (!user) {
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(500).json({
                    sucess: false,
                    message: "Post Not Found"
                })
            }

            const commentData = {
                userId,
                comment
            };

            post.comments.push(commentData);
            await post.save();

            return res.status(200).json({
                sucess: true,
                message: "Comment Added Sucessfully",
                post
            })
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in adding Comments"
        })

    }
}




exports.deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        if (!postId || !commentId) {
            return res.status(400).json({
                sucess: false,
                message: "Please Provide postId and commentId"
            })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({
                sucess: false,
                message: "Post Not Found"
            })
        }


        const deleTe = await PostModel.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } }, { new: true })


        return res.status(200).json({
            sucess: true,
            message: "Comment Deleted Successfully",
            deleTe
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            sucess: false,
            message: "Error in delete comment"
        })
    }
}
