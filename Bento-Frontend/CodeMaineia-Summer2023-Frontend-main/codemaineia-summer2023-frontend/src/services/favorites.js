import axios from "axios";

class FavoritesDataService {
    getFavorites(userId){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes/favorites/${userId}`);
    }

    updateFavorites(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/recipes/favorites`, data);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new FavoritesDataService();