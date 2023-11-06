import React from 'react';
import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
    const navigate = useNavigate();

    const onClick = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        navigate("/");
    };


    return (
        <div className='g-logout'>
            <Button
                variant='light'
                onClick={onClick}
                className='btn btn-primary'
            >Logout</Button>
        </div>
    );
}

export default Logout;

