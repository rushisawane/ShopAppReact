import React from 'react';
import { useSelector } from 'react-redux';
import {Navbar,Container,Row,Col,NavDropdown,Nav,Image} from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosStats,IoIosGitPullRequest,IoIosDocument,IoIosDesktop } from "react-icons/io";
import { IconContext } from 'react-icons';
import Color from '../Constant/Color';
import {Link} from 'react-router-dom';

const Header = (props) => {

    const isAuthenticated = useSelector(state=>state.authReducer.token!==null);

    
    return (
        <Container fluid style={{backgroundColor:Color.primary}}>
        <Row> 
            <Col sm={10}>
                <Navbar.Brand>
                    <b style={{color:'white'}} className="header-title">Shop App</b>
                </Navbar.Brand>
            </Col>
            <Col offset={6}></Col>
            <Col>
               
                <Nav.Item>
                <Link to="/cart">
                <div style={{ textAlign:'center' }}>
                    <IconContext.Provider value={{ size:'1.5em', color: "white", className: "header-icons" }}>
                            <FaCartPlus />
                    </IconContext.Provider></div></Link>
                </Nav.Item>
               
            
                <Nav.Item>
                    <Nav.Link><Link to="/logout" style={{color:'white'}}>{isAuthenticated?<b>LOGOUT</b>:null}</Link></Nav.Link>
                </Nav.Item>
            </Col>
            
        </Row>
        </Container>
    )
}

export default Header;