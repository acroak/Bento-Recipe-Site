import React, { useState } from 'react';
import RecipeDataService from '../services/recipes';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


const AddComment = ({ user }) => {
    const navigate = useNavigate()
    let params = useParams();

    let editing = false;
    let initialCommentState = "";

    let location = useLocation();
    if ((location.state !== null)&&(location.state.currentComment !== null)) {
        editing = true;
    }


    const [comment, setComment] = useState(initialCommentState);

    const onChangeComment = e => {
        const comment = e.target.value;
        setComment(comment);
    }

    const saveComment = () => {
        var data = {
            comment: comment,
            name: user.name,
            user_id: user.googleId,
            recipe_id: params.id //get recipe id from url 
        }


        if (editing) {
            let currComment = location.state.currentComment;
            data = {
                comment_id: currComment._id,
                comment: comment,
                user_id: user.googleId,
                name: user.name,
                recipe_id: params.id
            }

            RecipeDataService.editComment(data)
                .then(response => {
                    navigate("/recipes/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                })


        } else {
            RecipeDataService.createComment(data)
                .then(response => {
                    navigate("/recipes/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{editing ? "Edit" : "Create"} Comment</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        comment={comment}
                        onChange={onChangeComment}
                        //defaultValue={editing ? null : ""}
                        defaultValue={editing ? location.state.currentComment.comment : ""}
                    />
                </Form.Group>
                <Button variant="primary" onClick={saveComment}>
                    Submit
                </Button>
            </Form>
        </Container>
    )

}

export default AddComment;

