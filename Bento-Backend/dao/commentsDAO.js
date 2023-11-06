import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let commentsCollection;

export default class CommentsDAO {
    static async injectDB(conn) {
        if (commentsCollection) {
            return;
        }
        try {
            commentsCollection = await conn.db(process.env.RECIPES_COLLECTION)
                .collection('comments');
        }
        catch (e) {
            console.error(`Unable to connect in CommentsDAO: ${e}`);
        }

    }

    //GET
    static async getComments(id) {
        let cursor;
        try {
            cursor = await commentsCollection.find({
                user_id: id
            });
            const comments = await cursor.toArray();
            return comments[0];
        } catch (e) {
            console.error(`Something went wrong in getComments: ${e}`);
            throw e;
        }
    }



    //PUT
    static async updateComment(commentId, user, comment, date) {
        //Modify the text of the comment and update the date element
        let response;//Stores the response for the mongodb method
        try {
            response = await commentsCollection.updateOne(
                { _id: new ObjectId(commentId) },
                { $set: { date: date, comment: comment } }
            )
            //Verify with the 'modifiedCount' attribute of the returned document
            //If it hasn't changed then throw an error
            if (response.modifiedCount == 0) {
                throw new Error('No comment found with given ID');
            } else return response;
        } catch (e) {
            console.error(`Unable to update comment: ${e}`)
            return { error: e };
        }



    }

    //DELETE
    static async deleteComment(commentId) {

        try {
            return await commentsCollection.deleteOne(
                { _id: new ObjectId(commentId) }
            )
        } catch (e) {
            console.error(`Unable to delete comment: ${e}`)
            return { error: e };
        }

    }






    //PUSH
    static async addComment(recipe_id, user, comment, date) {
        try {
            const commentDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                comment: comment,
                recipe_id: new ObjectId(recipe_id),
            }
            return await commentsCollection.insertOne(commentDoc);
        } catch (e) {
            console.error(`Unable to post comment : ${e}`);
            return { error: e };
        }
    }



}

