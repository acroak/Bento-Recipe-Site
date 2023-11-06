import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let recipesCollection;

export default class RecipesDAO {
    static async injectDB(conn) {
        if (recipesCollection) {
            return;
        }
        try {
            recipesCollection = await conn.db(process.env.RECIPES_COLLECTION)
                .collection('recipes');
        }
        catch (e) {
            console.error(`Unable to connect in RecipesDAO: ${e}`);
        }

    }
    static async getRecipes({
        filters = null,
        page = 0,
        recipesPerPage = 20,
    } = {}) {//empty object as defualt value
        let query;
        if (filters) {
            if ('name' in filters) {
                query = { $text: { $search: filters['name'] } };
            } else if ('category' in filters) {
                query = { 'subcategory': { $eq: filters['category'] } };
            }
        }
        console.log(query);

        let cursor;
        try {
            cursor = await recipesCollection.find(query)
                //cursor = await recipesCollection.find()
                .limit(recipesPerPage)
                .skip(recipesPerPage * page);
            const recipesList = await cursor.toArray();
            const totalNumRecipes = await recipesCollection.countDocuments(query);
            //const totalNumRecipes = await recipesCollection.countDocuments();
            return { recipesList, totalNumRecipes };
            //return {recipesList}
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { recipesList: [], totalNumRecipes: 0 };
            //return { recipesList: []};
        }
    }

    static async getCategory() {
        let categories = [];
        try {
            categories = await recipesCollection.distinct('subcategory');
            return categories;
        } catch (e) {
            console.error(`Unable to get ratings, ${e}`);
            return categories;
        }
    }

    //PUT
    static async updateReview(reviewId, user, review, date) {
        //Modify the text of the recipe and update the date element
        let response;//Stores the response for the mongodb method
        try {
            response = await recipesCollection.updateOne(
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
            return await recipesCollection.deleteOne(
                { _id: new ObjectId(reviewId) }
            )
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e };
        }

    }

    //GET With ID
    static async getRecipeById(id) {
        try {
            return await recipesCollection.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'recipe_id',
                        as: 'comments',
                    }
                }
            ]).next();
        } catch (e) {
            console.error(`Unable to get movie by ID: ${e}`);
            throw e;
        }
    }




}

