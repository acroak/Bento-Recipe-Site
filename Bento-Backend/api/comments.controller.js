import CommentsDAO from "../dao/commentsDAO.js";

export default class CommentsController {
    static async apiPostComment(req, res, next) {
        try {
            const recipeId = req.body.recipe_id;
            const comment = req.body.comment;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }

            const date = new Date();

            const CommentResponse = await CommentsDAO.addComment(
                recipeId,
                userInfo,
                comment,
                date
            );

            var { error } = CommentResponse;

            if (error) {
                res.status(500).json({ error: "Unable to post Comment." });
            } else {
                res.json({
                    status: "success",
                    response: CommentResponse
                });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateComment(req, res, next) {
        try {
            const commentId = req.body.comment_id;
            const comment = req.body.comment;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }
            const date = new Date();

            const updateResponse = await CommentsDAO.updateComment(
                commentId, userInfo, comment, date
            );

            var { error } = updateResponse;

            if (error) {
                res.status(500).json({ error: "Unable to update Comment." });
            } else {
                res.json({
                    status: "success",
                    response: updateResponse
                });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteComment(req, res, next) {
        try {
            
            const commentId = req.body.comment_id;

            const deleteResponse = await CommentsDAO.deleteComment(
                commentId
            );
            var { error } = deleteResponse;

            if (error) {
                res.status(500).json({ error: "Unable to update Comment." });
            } else {
                res.json({
                    status: "success",
                    response: deleteResponse
                });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }

    }
}
