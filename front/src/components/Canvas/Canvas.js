import React from 'react';
import Navbar from '../Navbar'
import Footer from  '../Footer/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section>
                {children}
            </section>
            <Footer />
        </>
    );
}
