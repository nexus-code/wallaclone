import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';


function AppNavbar({ user, logout }) {

    const { t } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const handleLogout = () => {

        logout();
    }

    const getNavLinkClass = (path) => {

        return ''; //props.location.pathname === path ? 'active' : '';
    }

    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/" >Wallaclone</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav.Link className={getNavLinkClass("/advert/")} href="/advert/">{t('Search')}</Nav.Link>
                {
                    user &&
                    <>
                        <Nav.Link className={getNavLinkClass("/advert/create")} href="/advert/create">{t('New advert')}</Nav.Link>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text> | </Navbar.Text>
                            <Nav.Link className={getNavLinkClass("/profile/")} href="/profile"> {user.username}</Nav.Link>
                            <Nav.Link className={getNavLinkClass("/logout/")} href="" onClick={handleLogout}>{t('Logout')}</Nav.Link>
                            <Navbar.Text> | </Navbar.Text>
                        </Navbar.Collapse>
                    </>
                }

                <NavDropdown title={t('Language')} id="collasible-nav-dropdown">
                    <Nav.Link onClick={() => changeLanguage('en')} >En</Nav.Link>
                    <Nav.Link onClick={() => changeLanguage('es')} >Es</Nav.Link>
                </NavDropdown>

            </Navbar.Collapse>
        </Navbar>
    )
};

AppNavbar.propTypes = {
    displaySearch: PropTypes.bool
}

// export default withRouter(AppNavbar);
export default AppNavbar;