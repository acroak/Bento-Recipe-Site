import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import RecipesDAO from './dao/recipesDAO.js';
import CommentsDAO from './dao/commentsDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js';

async function main(){
    //Poiting to our .env file
    dotenv.config();

    //Setting our .env values to the backend
    const client = new mongodb.MongoClient(
        process.env.RECIPES_DB_URI
    );
    const port = process.env.PORT || 8000;

    try{
        //Connect to MongoDB server
        await client.connect();
        await RecipesDAO.injectDB(client);
        await CommentsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        });

    }catch(e){
        console.error(e);
        process.exit(1);
    }

}

main().catch(console.error);

//We export here for the benefit of testing
export default app;
