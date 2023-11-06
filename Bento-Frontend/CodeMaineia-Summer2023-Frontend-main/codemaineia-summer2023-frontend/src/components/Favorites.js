import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import RecipesDataService from "../services/recipes"
import { motion } from "framer-motion";

import './Favorites.css'

const Favorites = ({ user, favorites, addFavorite, deleteFavorite }) => {

    const [favesData, setFavesData] = useState([]);

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function(text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    }

    const getRecipe = async (id) => {
        let recipeResponse = await RecipesDataService.findById(id);
        const { _id, name, image, description, subcategory, author } = recipeResponse.data;
        return {
            _id: _id,
            name: name,
            image: image,
            description: description,
            subcategory: subcategory,
            author: author
        };
    }

    useEffect(() => {
        //if (doLoadFaves) {
        // create an array to store each movie's promise
        let favePromises = [];
        favorites.forEach(id => {
            favePromises.push(getRecipe(id));
        });

        // once all the promises are resolved, set them as state of favesData
        Promise.all(favePromises).then((values) => {
            let indexedFavorites = values.map((fave) => {
                console.log(fave)
                return { title: fave.name, _id: fave._id, tag: fave.id, image: fave.image, subcategory: fave.subcategory, author: fave.author, description: fave.description }
            })
            setFavesData(indexedFavorites);
        });
        //}
    }, [favorites]);


    return (
        <Container>

            <Row className="title mb-3 mt-5">
                <h2 className="mb-2 mt-2">Liked Recipes</h2>


            </Row>


            <motion.div
                className="input-group mb-3"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: .25,
                    ease: [0, 0.7, 0.2, 1]
                }}
            >

                <Row className="row-cols-md-2">
                    {favesData.map((recipe) => {
                        return (

                            <Col>
                                <Card className='favCard' key={recipe._id}>
                                    <Row>
                                        <Col>

                                            <Link to={'/recipes/' + recipe._id}>
                                                <motion.div
                                                    className="box"
                                                    initial={{ opacity: 0, scale: 0.75 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        duration: 1,
                                                        delay: .3,
                                                        ease: [0, 0.7, 0.2, 1]
                                                    }}
                                                >
                                                    <Card.Body>
                                                        <Card.Title>{toTitleCase(recipe.title)}</Card.Title>
                                                        <Card.Img src={recipe.image} />
                                                        <Card.Text>by {recipe.author}</Card.Text>
                                                        <Card.Text>{recipe.subcategory}</Card.Text>
                                                    </Card.Body>
                                                </motion.div>
                                            </Link>
                                            {user && (
                                                favorites.includes(recipe._id) ?
                                                    <motion.div
                                                        className="input-group mb-3"
                                                        initial={{ opacity: 0, scale: 0.75 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            duration: 1,
                                                            delay: 0.275,
                                                            ease: [0, 0.7, 0.2, 1]
                                                        }}
                                                    >
                                                        <svg onClick={() => deleteFavorite(recipe._id)} className="filled-heart fav-heart" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 110 110" x="0px" y="0px"><path
                                                            d="M23.262,65.293a.312.312,0,0,1,.03.024c5.987,4.817,13.426,11.584,23.49,20.941a1.052,1.052,0,0,0,1.436,0C58.278,76.9,65.719,70.134,71.7,65.317a.144.144,0,0,0
                                ,.03-.024c5.553-4.8,12.47-11.252,16.69-18.578,4.81-8.345,5.349-16.533,1.606-24.332A24.546,24.546,0,0,0,47.5,19.358a24.545,24.545,0,0,0-42.53,3.025c-3.742,7.8-3.2,15.987
                                ,1.607,24.332C10.8,54.041,17.709,60.493,23.262,65.293Z"/>
                                                        </svg>


                                                    </motion.div>
                                                    :
                                                    <motion.div
                                                        className="input-group mb-3"
                                                        initial={{ opacity: 0, scale: 0.75 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            duration: 1,
                                                            delay: 1,
                                                            ease: [0, 0.7, 0.2, 1]
                                                        }}
                                                    >
                                                        <svg onClick={() => addFavorite(recipe._id)} className="fav-heart empty-heart" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 110 110" x="0px" y="0px"><path
                                                            d="M23.262,65.293a.312.312,0,0,1,.03.024c5.987,4.817,13.426,11.584,23.49,20.941a1.052,1.052,0,0,0,1.436,0C58.278,76.9,65.719,70.134,71.7,65.317a.144.144,0,0,0
                                ,.03-.024c5.553-4.8,12.47-11.252,16.69-18.578,4.81-8.345,5.349-16.533,1.606-24.332A24.546,24.546,0,0,0,47.5,19.358a24.545,24.545,0,0,0-42.53,3.025c-3.742,7.8-3.2,15.987
                                ,1.607,24.332C10.8,54.041,17.709,60.493,23.262,65.293Z"/>
                                                        </svg>


                                                    </motion.div>
                                            )}
                                        </Col>

                                            <Col>
                            <Link to={'/recipes/' + recipe._id}>
                                                <div className="favDesc align-middle">
                                                    <div>
                                                        {recipe.description}
                                                    </div>
                                                </div>
                            </Link>
                                            </Col>
                                    </Row>
                                </Card>
                            </Col>

                        )
                    })}

                </Row>
            </motion.div>
            <br />


        </Container >
    )
}

export default Favorites

