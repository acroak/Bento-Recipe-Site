import express from 'express';
import RecipesController from './recipes.controller.js';
import CommentsController from './comments.controller.js';
import FavoritesController from './favorites.controller.js';

const router = express.Router(); //Get access to Express router

router.route('/').get(RecipesController.apiGetRecipes);
router.route('/id/:id').get(RecipesController.apiGetRecipeById);
router.route('/category').get(RecipesController.apiGetCategory);

router.route('/comments').post(CommentsController.apiPostComment);
router.route('/comments').put(CommentsController.apiUpdateComment);
router.route('/comments').delete(CommentsController.apiDeleteComment);

router
    .route("/favorites")
    .put(FavoritesController.apiUpdateFavorites);
router
    .route("/favorites/:userID")
    .get(FavoritesController.apiGetFavorites);

export default router;
