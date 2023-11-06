import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import NotFound from './components/NotFound';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect, useCallback } from 'react';
import FavoritesDataService from './services/favorites';
import AddComment from './components/AddComment'
import Favorites from './components/Favorites'



import './App.css';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    //Trigger to upload favorites to the DB
    const [canWriteFavs, setCanWriteFavs] = useState(false);

    const addFavorite = (recipeId) => {
        setFavorites([...favorites, recipeId])
        setCanWriteFavs(true);
    }

    const deleteFavorite = (recipeId) => {
        setFavorites(favorites.filter(f => f !== recipeId));
        setCanWriteFavs(true);
    }

    const uploadFavs = useCallback(() => {
        if (canWriteFavs) {
            try {
                if (user && user.googleId) {
                    let data = {
                        _id: user.googleId,
                        favorites: favorites
                    }
                    FavoritesDataService.updateFavorites(data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        setCanWriteFavs(false);
    }, [favorites, user, canWriteFavs]);

    //Load Favorite Information from the DB
    useEffect(() => {
        const getFavs = id => {
            FavoritesDataService.getFavorites(id).then(
                response => {
                    if (response.status === 200) setFavorites(response.data.favorites);
                }
            )
                .catch(e => {
                    console.log(e)
                })
        }
        if (user) getFavs(user.googleId);
    }, [user])


    //Update DB with new Favorite info
    useEffect(() => {
        uploadFavs();
    }, [uploadFavs]);



    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="App">
                <Header user={user} setUser={setUser} clientId={clientId} />

                <div className="main-container">
                    <Routes>
                        <Route exact path="/" element={<LandingPage user={user} />} />

                        <Route exact path="/recipes" element={
                            <RecipeList user={user} favorites={favorites} 
                            addFavorite={addFavorite} deleteFavorite={deleteFavorite}/>} />

                        <Route exact path="/recipes/:id" element={<Recipe user={user} />} />

                        <Route exact path="/recipes/:id/comment" element={
                                <AddComment user={user} />}
                            />

                        <Route exact path="/favorites" element={<Favorites user={user} favorites={favorites} setFavorites={setFavorites} addFavorite={addFavorite} deleteFavorite={deleteFavorite}/>} />

                        <Route path="*" element={<NotFound user={user} />} />

                    </Routes>
                </div>

                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
