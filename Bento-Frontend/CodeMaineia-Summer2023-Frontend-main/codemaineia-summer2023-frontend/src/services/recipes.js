import axios from 'axios';

class RecipeDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes?page=${page}`);
    }

    find(query, by = 'title', page = 0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes?${by}=${query}&page=${page}`
        );
    }

    //Created for the Challenge Section of HW4
    //For use in the Movie component
    //Retrieves data using the /id endpoint we made in the backend
    findById(id = 0){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes/id/${id}`
        );
    }

    createComment(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/API/v1/recipes/comments`, data);
    }

    editComment(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/API/v1/recipes/comments`, data);
    }

    deleteComment(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/API/v1/recipes/comments`, {data: data});
    }

    //getComment() {
    //    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes/ratings`);
    //}

    //-------------------- Categories ----------------------
    getCategories(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes/category`);
    }

    findByCategory(query, by="subcategory", page=0){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes?${by}=${query}&page=${page}`
        );
    }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new RecipeDataService();

