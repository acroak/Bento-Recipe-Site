import RecipesDAO from '../dao/recipesDAO.js';


export default class RecipesController{

    static async apiGetRecipes(req, res, next){
        const recipesPerPage= req.query.recipesPerPage ?
            parseInt(req.query.recipesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {}
         if (req.query.subcategory) {
             filters.category = req.query.subcategory;
         } else if (req.query.name) {
             filters.name = req.query.name;
         }

        const { recipesList, totalNumRecipes } = await
            RecipesDAO.getRecipes({filters, page, recipesPerPage });

        let response = {
            recipes : recipesList, 
            page: page,
            filters: filters, 
            entries_per_page: recipesPerPage,
            total_results: totalNumRecipes,
        };
        res.json(response);

    }

    static async apiGetRecipeById(req, res, next){

        try{
            let id = req.params.id || {}
            let recipe = await RecipesDAO.getRecipeById(id);
            if (!recipe) {
                res.status(404).json({error: "not found"});
                return;
            }
            res.json(recipe);
        }catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiGetCategory(req, res, next){
        try{
            let categories = await RecipesDAO.getCategory();
            res.json(categories);
        }catch (e){
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }


}
