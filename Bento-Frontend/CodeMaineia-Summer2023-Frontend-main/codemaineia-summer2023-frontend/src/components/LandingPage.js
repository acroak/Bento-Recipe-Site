import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipesDataService from "../services/recipes"

import './LandingPage.css';
import { useCallback } from "react";

const LandingPage = () => {
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    /* Retrieve an array of all categories of our recipes.
    In the DB we have a key value pair of "maincategory" or "subcategory" to choose from. Oor dataset has "maincategory" set primarily as the string "recipe", so we use "subcategory" for more variation and rename it simply to "category"
    */
    const retrieveCategories = useCallback( () => {
        RecipesDataService.getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch( e => {
                console.log(e.response);
            })
    },[]);

    useEffect(() => {
        retrieveCategories();
    }, [retrieveCategories]);


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value.trim());
    }

    const handleSearchSubmit = (event) => {
      event.preventDefault();
      if (searchValue && searchValue.length > 0) {
        navigate('/recipes?search-results=' + searchValue);
      }
    };

    return(
        <div>
            <motion.div 
                className="hero-row pt-5"
                initial={{ opacity: 0, scale:0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.25,
                    ease: [0, 0.7, 0.2, 1]
                }}
            >
                <div className="pt-3">
                    <Card className="hero-card d-flex align-items-center justify-content-center">
                            <Row className="hero-copy">
                                <Card.Title className="fs-1">
                                    FIND SOMETHING<br/>DELICIOUS.
                                </Card.Title>

                                <Card.Body>
                                    <motion.div 
                                        className="input-group mb-3"
                                        initial={{ opacity: 0, scale: 0.75 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.5,
                                            ease: [0, 0.7, 0.2, 1]
                                        }}
                                    >
                                        <form 
                                            onSubmit={handleSearchSubmit}
                                            className="input-group mb-3">
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="search recipes..."
                                                    value={searchValue}
                                                    onChange={handleSearchChange}
                                                />

                                                <Button type="submit" id="submit-btn">search</Button> 
                                        </form>
                                    </motion.div>
                                </Card.Body>
                            </Row>
                   
                    </Card>
                </div>
            </motion.div>

            <Container className="pt-3">                       
                <Row>                
                    <motion.h2
                        className="py-4"
                        initial={{ opacity: 0, scale:0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1,
                            delay: .75,
                            ease: [0, 0.7, 0.2, 1]
                        }}  
                    >
                        Categories
                    </motion.h2>
                </Row>

                <Row className="row-cols-1 row-cols-sm-1 row-cols-md-3">
                        {categories.map((category, i)=> {
                            return (
                                <Col 
                                    key={i} 
                                    className="py-3" 
                                >
                
                                    <motion.a 
                                        href={ "/recipes?category=" + category }
                                        className="category-card-link"
                                        initial={{ opacity: 0, scale: 0.75 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: 1,
                                            ease: [0, 0.7, 0.2, 1]
                                        }}
                                        alt={category}
                                    >
                        
                                        <Card className="category-card">

                                            <Card.Img 
                                                src =  {process.env.PUBLIC_URL + "/images/categories/" + category.split(" ")[0] + ".jpg"}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = process.env.PUBLIC_URL + "/images/NoImg.svg";
                                                }}
                                                alt={category}
                                                className="mt-4"
                                            />
                    
                                            <h5 
                                                id={category}
                                                className="py-2">
                                                    {category}
                                            </h5>
                                        </Card>             
                                    </motion.a>
                                </Col>
                            )
                        })}
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage;
