import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../context/CurrentUserContext";

const NavBar = () => {
  const loggedInUser = useLoggedInUser();
  
  const loggedInNavbar = <>{loggedInUser?.username}</>
  const loggedOutNavbar = (
    <>
      <NavLink to="/signin">
        <i className="fa-solid fa-right-to-bracket"></i> Sign in
      </NavLink>
      <NavLink to="/signup">
        <i className="fa-solid fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );
  return (
    <Navbar expand="lg" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/">
              <i className="fa-solid fa-house"></i> Home
            </NavLink>
            {loggedInUser ? loggedInNavbar : loggedOutNavbar}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
