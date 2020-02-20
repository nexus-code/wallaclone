/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const [menuState, setMenuState] = useState('');

    const changeLanguage = (lng) => i18n.changeLanguage(lng);
    const handleLogout = () => logout()
    
    const handleMenuClick = () => {        
        const state = menuState === '' ? 'active' : '';
        setMenuState(state);
    }

    return <>
        <div className="header">
            <Link to="/" className="home"><h1>Wallaclone <span>0.2</span></h1></Link>
            <svg id="wHeader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon className="svg-header svg--sm" fill="white" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100" />
                <polygon className="svg-header svg--lg" fill="white" points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100" />
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
                            <Link to="/profile" className="menu-link">
                                <li>{t('My profile')}</li>
                            </Link>
                            <Link to="/advert/edit" className="menu-link">
                                <li>{t('Adverts handler')}</li>
                            </Link>
                            <Link to="#" onClick={handleLogout} className="menu-link">
                                <li>{t('Logout')}</li>
                            </Link>
                        </>
                    }
                    {
                        !user
                        &&
                        <>
                            <Link to="/login" className="menu-link">
                                <li>{t('Login')}/{t('Register')}</li>
                            </Link>
                            <Link to="#" onClick={() => changeLanguage('en')} className="menu-link">
                                <li>English</li>
                            </Link>
                            <Link to="#" onClick={() => changeLanguage('es')} className="menu-link">
                                <li>Español</li>
                            </Link>
                            
                        </>
                    }
                    <Link to="/credits" className="menu-link">
                        <li>{t('Credits')}</li>
                    </Link>
                </ul>
            </nav>
        </div>
    </>
};

export default AppNavbar;