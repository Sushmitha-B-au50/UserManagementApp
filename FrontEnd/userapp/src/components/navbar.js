import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Logo from '../Images/logo.png';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';





export default function Navigation() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="navbar-custom text-white" fixed="top">
                <Container>
                    <Image src={Logo}  height={70} width={75} className="ms-5" />
                    <Navbar.Brand className="display-1 text-white"> <h3>User Management App</h3>  </Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Offcanvas  show={show} onHide={handleClose} >
                            <Offcanvas.Header closeButton className="sidebar">
                                <Offcanvas.Title>
                                    <Image  src={Logo} height={80} width={85} className="m-2" />
                                    Welcome!
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="sidebar">
                                <div className="items">
                                    <Link className="flex-items" to="/">Home</Link>
                                    <Link className="flex-items me-5" to="/Listing">Users</Link>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Navbar.Collapse>
                    <HiMenu aria-controls="responsive-navbar-nav" className='ms-5' size={30} onClick={handleShow} ></HiMenu>
                </Container>
            </Navbar>
        </>
    );
}

