import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import './navbar.css';

/**
 * 
 * Load app header: app menu and title
 * thanks to:
 * https://codepen.io/Philippe_Fercha/pen/rqkci
 * https://codepen.io/erikdkennedy/pen/zNpXee
 */

function AppNavbar({ user, logout }) {

    const { t } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const handleLogout = () => {

        logout();
    }

    const [menuState, setMenuState] = useState('');

    
    const handleMenuClick = () => {
        
        const state = menuState === '' ? 'active' : '';
        setMenuState(state);
    }

    return <>
        <div className="header">
            <a href="/" className="home"><h1>Wallaclone</h1></a>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon className="svg--sm" fill="white" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100" />
                <polygon className="svg--lg" fill="white" points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100" />
            </svg>            
            <nav className={`menu-opener ${ menuState }`} onClick={handleMenuClick}>
                <div className={`menu-opener-inner ${ menuState }`}></div>
            </nav>
            <nav className={`menu ${ menuState }`}>
                <ul className={`menu-inner ${ menuState }`}>
                    {
                        user
                        &&
                        <>
                            <a href="/profile" className="menu-link">
                                <li>{t('Edit profile')}</li>
                            </a>
                            <a href="/advert/create" className="menu-link">
                                <li>{t('New advert')}</li>
                            </a>
                            <a href="#" onClick={handleLogout} className="menu-link">
                                <li>{t('Logout')}</li>
                            </a>
                        </>
                    }
                    {
                        !user
                        &&
                        <>
                            <a href="/login" className="menu-link">
                                <li>{t('Login')}</li>
                            </a>
                            <a href="/register" className="menu-link">
                                <li>{t('Register')}</li>
                            </a>
                            <a href="#" onClick={() => changeLanguage('en')} className="menu-link">
                                <li>English</li>
                            </a>
                            <a href="#" onClick={() => changeLanguage('es')} className="menu-link">
                                <li>Español</li>
                            </a>
                            
                        </>
                    }
                </ul>
            </nav>
        </div>
        <section>
            {/* <h1>Section Content</h1> */}
        </section>
    </>
};

AppNavbar.propTypes = {
    displaySearch: PropTypes.bool
}

// export default withRouter(AppNavbar);
export default AppNavbar;