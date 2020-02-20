import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Advert from '../Advert/Advert';
import Loader from 'react-loader-spinner'

import './advertlist.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// thanks to: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks

/**
 * 
 * List adverts with infinite scroll
 * 
 */

export default function AdvertList({ adverts, loadMoreAdverts }) {

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }

    const fetchMoreListItems = async () => {
        
        setIsFetching(true);

        setTimeout(() => {            
            loadMoreAdverts();
            setIsFetching(false);
        }, 1000);
    }


    return <>

        <div className='container text-center'>
            <div className='advert-grid'>
                {
                    adverts
                    &&
                    adverts.length
                    &&
                    adverts.map(advert => <Advert advert={advert} key={advert.id} />)
                }
                {
                    isFetching 
                    &&
                    <Loader                        
                    type="Triangle"
                    color="#1a83a2"
                    height={100}
                    width={100}
                    timeout={3000}
                    />
                    }
                {
                    !adverts
                    &&
                    <div className='text-center mt-5'>
                        <h2>404: No advertisements found</h2>
                    </div>
                }
            </div>
        </div>

    </>
}

AdvertList.propTypes = {
    adverts: PropTypes.array.isRequired
}