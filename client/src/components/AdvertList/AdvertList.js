import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Advert from '../Advert/Advert';
import { useTranslation } from 'react-i18next';

import './advertlist.css';

// thanks to: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks

/**
 * 
 * List advert with infinite scroll
 * 
 */

export default function AdvertList({ adverts, loadMoreAdverts }) {

    const { t } = useTranslation();

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
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

        <div className='container'>
            <div className='advert-grid'>
                {
                    adverts
                    &&
                    adverts.length
                    &&
                    adverts.map(advert => <Advert advert={advert} key={advert.id} />)
                }

                {isFetching && 'Fetching more list items...'}

                {
                    !adverts
                    &&
                    <div className='text-center mt-5'>
                        <h2>No advertisements found</h2>
                    </div>
                }
            </div>
        </div>

    </>
}

AdvertList.propTypes = {
    adverts: PropTypes.array.isRequired
}