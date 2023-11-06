import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import logo from '../logo.svg';
import './Footer.css';
const Footer = () => {

    return(
        <div>
            <motion.footer
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.25,
                    ease: [0, 0.7, 0.2, 1]
                }}
            
            >
                <Container>
                    <Row className="row row-cols-1 row-cols-sm-1 row-cols-md-3 pt-1 my-2">
                        <Col className="mb-1 footer-logo">
                            <a href="/" alt="home">
                                <img 
                                    src={logo}  
                                    alt="logo"
                                />
                                {' '}BENTO
                            </a>
                        </Col>

                        <Col className="col mb-1">
                            <h5 className="footer-headers">About</h5>
                            <ul className="nav flex-column">
                                <li>
                                    <a href="https://tonyburwinkel.github.io/connect-4" alt="Tony Burwinkel Portfolio" className="nav-link p-0 footer-link" target="_blank" rel="noopener noreferrer">Burwinkel</a>
                                </li>
                                <li>
                                    <a href="https://acroak.github.io/" alt="Andrea Croak Portfolio" className="nav-link p-0 footer-link" target="_blank" rel="noopener noreferrer">Croak</a>
                                </li>
                                <li>
                                    <a href="https://charleswlees.com/" alt="Charlie Lees Portfolio" className="nav-link p-0 footer-link" target="_blank" rel="noopener noreferrer">Lees</a>
                                </li>
                            </ul>
                        </Col>

                        <Col className="col mb-1">
                        <h5 className="footer-headers">Legal</h5>
                            <ul className="nav flex-column">
                                <li>
                                    <a href="/" alt="Terms" className="nav-link p-0 footer-link disabled">Terms</a>
                                </li>
                                <li>
                                    <a href="/" alt="Conditions" className="nav-link p-0 footer-link disabled">Conditions</a>
                                </li>
                                <li>
                                    <a href="/" alt="Copyright" className="nav-link p-0 footer-link disabled">Copyright</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>

                    <Row className="row row-cols-1 row-cols-sm-1 row-cols-md-3 pt-3 my-2 border-top">
                        <Col>
                        <p>© 2023 Bento, Inc. All rights reserved.</p>
                        </Col>
                        <Col>{/* Spacer*/}</Col> 
                        <Col>
                        <ul className="list-unstyled d-flex align-items-center justify-content-center">
                            <li className="ms-3">
                                <a className="link-dark" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" alt="Facebook">
                                    <motion.img 
                                        src="/icons/fb.svg"
                                        className="social-icons"
                                        alt="Facebook"
                                        whileHover={{
                                            scale: 1.25,
                                            transition: { duration: .2 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="link-dark" href="https://twitter.com/" target="_blank" rel="noopener noreferrer" alt="Twitter">
                                    <motion.img
                                        src="/icons/twitter.svg"
                                        className="social-icons"
                                        alt="Twitter"
                                        whileHover={{
                                            scale: 1.25,
                                            transition: { duration: .2 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="link-dark" href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" alt="Pinterest">
                                    <motion.img 
                                        src="/icons/pin.svg"
                                        className="social-icons"
                                        alt="Pintrest"
                                        whileHover={{
                                            scale: 1.25,
                                            transition: { duration: .2 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                </a>
                            </li>
                        </ul>
                        </Col>
                    </Row>
                </Container>
            </motion.footer>
        </div>
    )
}


export default Footer;
