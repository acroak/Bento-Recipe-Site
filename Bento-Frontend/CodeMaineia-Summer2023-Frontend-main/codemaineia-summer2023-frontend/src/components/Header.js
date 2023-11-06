import { Container, Navbar, Nav} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../logo.svg';
import './Header.css';
import { motion } from "framer-motion";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import Logout from "./Logout";

const Header = ({user, setUser, clientId}) => {

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    function noImg(e) {
        e.target.onerror = null;
        e.target.src = process.env.PUBLIC_URL + "/images/NoImg.svg";
    }


    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem("login"));
        if (loginData) {
            let loginExp = loginData.exp;
            let now = Date.now() / 1000;
            if (now < loginExp) {
                //Not Expired
                setUser(loginData);
            } else {
                //Expired
                localStorage.setItem("login", null);
            }
        }
    }, []);

    //Handle Search bar expansion animation
    const handleExpand = () => {
        const search = document.querySelector(".search-input");
        search.classList.toggle("search-expanded");
    };

    // Handle Search Navigation 
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value.trim());
    }

    const handleSearchSubmit = (event) => {
      event.preventDefault();
      if (searchValue && searchValue.length > 0) {
        navigate('/recipes?search-results=' + searchValue);
      }
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-top shadow-4 border-bottom ">
        <Container className="header">
            <Navbar.Brand href="/">
                <img 
                src={logo}  
                alt="logo"
                className="navbar-logo" />{' '}
                BENTO
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {/* placeholder to keep links right aligned */}
            </Nav>

            <Nav>
            <div className="search-container"> 
                <div className="nav-search" >

                    <motion.img 
                        src="/icons/noun-search.svg"
                        alt="Search"
                        className="navbar-icons search-wrapper"
                        whileHover={{
                            scale: 1.25,
                            transition: { duration: .2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleExpand}
                    />

                    <input
                        type="text"
                        className="search-input form-control"
                        placeholder="search recipes..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={(e)=> {
                            if(e.keyCode === 13) {
                                handleSearchSubmit(e);

                            }
                        }}
                    />  
                </div>
            </div>

            <div className="collapsed-addon">
                <span>Search&#160;</span>
                <form 
                    onSubmit={handleSearchSubmit}
                >
                <input
                    type="text"
                    className="search-dropdown form-control"
                    placeholder="search recipes..."
                    value={searchValue}
                    onChange={handleSearchChange}
                />

                </form>
            </div>
            </Nav>

            <Nav>
              <Nav.Link href="/recipes">

                <motion.img 
                    src="/icons/all-recipes.svg"
                    alt="All Recipes"
                    className="navbar-icons"
                    whileHover={{
                        scale: 1.25,
                        transition: { duration: .2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                />
                <span className="collapsed-addon">All Recipes</span>
          
              </Nav.Link>

            {/* Conditionally display the likes and account links only if a user is logged in via google OAuth */}
            { user &&
              (<>
                <Nav.Link href="/favorites">
                    <motion.img
                        src="/icons/noun-heart.svg"
                        alt="Liked Recipes"
                        className="navbar-icons" 
                        whileHover={{
                            scale: 1.25,
                            transition: { duration: .2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    />
                    <span className="collapsed-addon">Likes</span>
                </Nav.Link>
                <Nav.Link className="disabled" href="#">
                        <motion.img
                            src={user.picture}
                            alt="User Account"
                            className="navbar-icons user-icon" 
                            onError={(e) => {noImg(e)}}
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: .2 },
                            }}
                            whileTap={{ scale: 0.9 }}
                        />
                        <span className="collapsed-addon">Account</span>
                    </Nav.Link>
                </>)
            }
 
                {user ? (
                    <Logout setUser={setUser} clientId={clientId} />
                ) : (
                    <Login setUser={setUser}className="collapsed-addon" />
                )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;
