import React from 'react';
import PropTypes from 'prop-types';
// import { useRouteMatch } from "react-router";
// import { withRouter }  from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';

function AppNavbar({ user, logout }) {

    const getNavLinkClass = (path) => {

        return ''; //props.location.pathname === path ? 'active' : '';
    }

    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/" >Wallakeep</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                {
                    user &&
                    <Nav className="mr-auto">
                        <Nav.Link className={getNavLinkClass("/advert/create")} href="/advert/create">New advert</Nav.Link>
                        <Nav.Link className={getNavLinkClass("/advert/")} href="/advert/">Search</Nav.Link>
                        <Nav.Link className={getNavLinkClass("/profile/")} href="/profile">My profile</Nav.Link>
                        {/* <Nav.Link className={getNavLinkClass("/logout/")} href="" onClick={logout}>Logout</Nav.Link> */}
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
};

AppNavbar.propTypes = {
    displaySearch: PropTypes.bool
}

// export default withRouter(AppNavbar);
export default AppNavbar;