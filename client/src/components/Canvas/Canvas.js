import React from 'react';
import Navbar from '../Navbar'
import Footer from  '../Footer/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Canvas.css';

export default function Layout({ children }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="main-section">
                {children}
            </section>
            <Footer />
        </>
    );
}
