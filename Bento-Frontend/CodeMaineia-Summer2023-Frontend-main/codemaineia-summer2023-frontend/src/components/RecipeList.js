import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useCallback } from "react";
import RecipesDataService from "../services/recipes"
import { motion } from "framer-motion";

import './RecipeList.css'

const RecipeList = ({ user, favorites, addFavorite, deleteFavorite }) => {

    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState(['All'])
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('')
    const [currentSearchMode, setCurrentSearchMode] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);

    const location = useLocation();
    const [hasCategorySearch, setHasCategorySearch] = useState(new URLSearchParams(location.search).has('category'));
    const [hasTitleSearch, setHasTitleSearch] = useState(new URLSearchParams(location.search).has('search-results'));
    const searchCatParam = new URLSearchParams(location.search).get('category');
    const searchTitleParam = new URLSearchParams(location.search).get('search-results');
    const navigate = useNavigate();

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function(text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    }

    // handles retrieving an array of all categories for drop down filter
    const retrieveCategories = useCallback(() => {
        RecipesDataService.getCategories()
            .then(response => {
                setCategory(['All'].concat(response.data))
            })
            .catch(e => {
                console.log(e);
            });

    }, []);

    const retrieveRecipes = useCallback(() => {
        setCurrentSearchMode('');
        RecipesDataService.getAll(currentPage)
            .then(response => {
                setRecipes(response.data.recipes);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const find = useCallback((query, by) => {
        RecipesDataService.find(query, by, currentPage)
            .then(response => {
                setRecipes(response.data.recipes);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const findByTitle = useCallback(() => {
        setCurrentSearchMode('findByTitle');
        find(searchTitle, 'name');
    }, [find, searchTitle]);

    const findByCategory = useCallback(() => {
        setCurrentSearchMode('findByCategory');
        if (searchCategory === 'All') {
            retrieveRecipes();
        } else {
            find(searchCategory, 'subcategory');
        }
    }, [find, searchCategory, retrieveRecipes]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === 'findByTitle') {
            findByTitle();
        } else if (currentSearchMode === 'findByCategory') {
            findByCategory();
        } else {
            retrieveRecipes();
        }
    }, [currentSearchMode, findByTitle, findByCategory, retrieveRecipes]);

    useEffect(() => {
        if (!hasCategorySearch && !hasTitleSearch) {
            RecipesDataService.getAll().then(res => {
                setRecipes(res.data.recipes)
            })
        }
    }, [hasCategorySearch, hasTitleSearch])

    // retrieve categories for dropdown filters
    useEffect(() => {
        retrieveCategories();
    }, [retrieveCategories]);

    // called whenever currentSearchMode changes
    // simply sets the currentPage to 0
    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    // whenever current page changes, call retrieveNextPage
    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    // checks to see if a category search parameter exists in the URL (redirected from "/")
    // should then filter page data for searched category and over-ride the All Recipes array
    useEffect(() => {
        if (hasCategorySearch) {
            setSearchCategory(searchCatParam);
            findByCategory();
        }
    }, [findByCategory, hasCategorySearch, searchCatParam])

    // checks to see if a search-results parameter exists in the URL (redirected from "/" or nav search bar)
    // should then filter page data for searched term via recipe name and over-ride the All Recipes array
    useEffect(() => {
        if (hasTitleSearch) {
            setSearchTitle(searchTitleParam);
            findByTitle();
        }
    }, [findByTitle, hasTitleSearch, searchTitleParam])

    const onChangeSearchCategory = e => {
        const searchCategory = e.target.value;
        setSearchCategory(searchCategory);
        setCurrentPage(0)
        navigate('/recipes?category=' + searchCategory);
    }

    return (
        <Container>
            <Form>
                <Row className="pt-5">

                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                as='select'
                                onChange={onChangeSearchCategory}
                            >
                                {category.map((category, i) => {
                                    return (
                                        <option value={category}
                                            key={i}>
                                            {category}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            type='button'
                            onClick={findByCategory}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Display next and prev buttons only when array is full */}
            {recipes.length > 18 &&

                <center>
                    <Row className='next-prev-ctn'>
                        {currentPage > 0 &&
                            (<Button className='next-prev-btn' variant="secondary"
                                onClick={() => { setCurrentPage(currentPage - 1) }}
                            > Prev
                            </Button>
                            )}
                        <Button className='next-prev-btn' variant="secondary"
                            onClick={() => { setCurrentPage(currentPage + 1) }}
                        >
                            Next
                        </Button>
                    </ Row>
                </center>

            }


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

            <Row>
                {recipes.map((recipe) => {
                    return (

                            <Card className='recipeCard' key={recipe._id}>

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
                                        <Card.Title>{toTitleCase(recipe.name)}</Card.Title>
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
                                        <svg onClick={()=> deleteFavorite(recipe._id)} className="filled-heart heart" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 110 110" x="0px" y="0px"><path 
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
                                        <svg onClick={() => addFavorite(recipe._id)} className="heart empty-heart" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 110 110" x="0px" y="0px"><path                                         
                                    d="M23.262,65.293a.312.312,0,0,1,.03.024c5.987,4.817,13.426,11.584,23.49,20.941a1.052,1.052,0,0,0,1.436,0C58.278,76.9,65.719,70.134,71.7,65.317a.144.144,0,0,0
                                ,.03-.024c5.553-4.8,12.47-11.252,16.69-18.578,4.81-8.345,5.349-16.533,1.606-24.332A24.546,24.546,0,0,0,47.5,19.358a24.545,24.545,0,0,0-42.53,3.025c-3.742,7.8-3.2,15.987
                                ,1.607,24.332C10.8,54.041,17.709,60.493,23.262,65.293Z"/>
                                        </svg>


                                    </motion.div>
                                )}
                            </Card>
                            
                    )
                })}

                </Row>
            </motion.div>

            <br />

            {/* Display next and prev buttons only when array is full */}
            {recipes.length > 18 &&

                <center>
                    <Row className='next-prev-ctn'>
                        {currentPage > 0 &&
                            (<Button className='next-prev-btn'
                                variant="secondary"
                                onClick={() => { setCurrentPage(currentPage - 1) }}
                            > Prev
                            </Button>
                            )}
                        <Button className='next-prev-btn'
                            variant="secondary"
                            onClick={() => { setCurrentPage(currentPage + 1) }}
                        >
                            Next
                        </Button>
                    </ Row>
                </center>

            }

        </Container>
    )
}

export default RecipeList
