import React, { useState, useEffect } from 'react';
import RecipeDataService from '../services/recipes';
import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import moment from 'moment';

import './Recipe.css'





const Recipe = ({ user }) => {

    let params = useParams();

    const [recipe, setRecipe] = useState({
        id: null,
        name: "",
        description: "",
        ingredients: [],
        steps: [],
        image: null,
        comments: []
    })

    useEffect(() => {
        const getRecipe = id => {
            RecipeDataService.findById(id).then(
                response => {
                    setRecipe(response.data);
                }
            )
                .catch(e => {
                    console.log(e);
                })
        }
        getRecipe(params.id)
    }, [params.id])


    return (
        <div className='pt-5'>
            <Container>
                <Row>
                    <Card>
                        <Card.Header as="h5">{recipe.name}</Card.Header>
                        <Card.Body>{recipe.description}</Card.Body>
                    </Card>

                </Row>
                <Row>
                    <Col>

                        <motion.div

                            className="box"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            <div className="recipeImage center">
                                <Image
                                    className="bigPicture"
                                    src={recipe.image}
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/NoImg.svg';
                                    }}
                                    fluid />

                            </div>
                        </motion.div>
                    </Col>
                    <Col>


                        <motion.div

                            className="box"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            <ListGroup className="mb-1" variant="flush center">
                                {recipe.ingredients.map((x, key) => {
                                    return (

                                        <ListGroup.Item key={key} className="list-group-item">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            {x}
                                        </ListGroup.Item>

                                    )
                                })}
                            </ListGroup>
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    <ListGroup className="mb-5" as="ol" numbered>
                        {recipe.steps.map((x, key) => {
                            return (<ListGroup.Item key={key}>
                                {x}
                            </ListGroup.Item>)
                        })}
                    </ListGroup>
                </Row>
                <Row>
                    <Col>
                        {user &&
                            <Link to={"/recipes/" + params.id + "/comment"}>
                                <Button className="mb-4">
                                    Add Comment

                                </Button>
                            </Link>}

                        {recipe.comments.length > 0 && (

                            <h2>Comments</h2>
                        )}
                        <br></br>
                        {recipe.comments.map((comment, index) => {
                            return (
                                <Card className="commentCard mb-5">
                                    <div className="d-flex" key={index}>
                                        <div className="flex-shrink-0 commentsText">
                                            <div>

                                                <p className="commentName">{comment.name}                   <span> {moment(comment.date).format("Do MMMM YYYY")}</span></p>

                                            </div>
                                            <p className="comment">{comment.comment}</p>
                                            {user && user.googleId === comment.user_id &&
                                                <Row>
                                                    <Col>
                                                        <Link to={{
                                                            pathname: "/recipes/" + params.id + "/comment"
                                                        }}
                                                            state={{
                                                                currentComment: comment
                                                            }}>
                                                            <Button className="editButton">
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button className="deleteButton" onClick={() => {
                                                            let data = {
                                                                comment_id: comment._id
                                                            }
                                                            RecipeDataService.deleteComment(data);
                                                            setRecipe((prevState) => {
                                                                prevState.comments.splice(index, 1);
                                                                return ({
                                                                    ...prevState
                                                                })
                                                            })
                                                        }}>
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            }

                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </Col>

                </Row>
            </Container>
        </div >
    )
}

export default Recipe;











