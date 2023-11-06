import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_COLLECTION)
                .collection('reviews');
        } catch (e) {
            console.error(`Unable to connect to reviewsDAO: ${e}`);
        }
    }
    //PUSH
    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId),
            }
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review : ${e}`);
            return { error: e };
        }
    }

    //PUT
    static async updateReview(reviewId, user, review, date) {
        //Modify the text of the review and update the date element
        let response;//Stores the response for the mongodb method
        try {
            response = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { date: date, review: review } }
            )
            //Verify with the 'modifiedCount' attribute of the returned document
            //If it hasn't changed then throw an error
            if (response.modifiedCount == 0) {
                throw new Error('No review found with given ID');
            } else return response;
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e };
        }



    }

    //DELETE
    static async deleteReview(reviewId) {

        try {
            return await reviews.deleteOne(
                { _id: new ObjectId(reviewId) }
            )
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e };
        }

    }

}
