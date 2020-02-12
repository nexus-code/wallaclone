import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Advert from '../Advert/Advert';

import { useTranslation } from 'react-i18next';


// import { getAdverts } from '../../store/adverts/selectors';

// font: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks

export default function AdvertList({ adverts, loadMoreAdverts }) {

    const { t } = useTranslation();

    const [query, setQuery] = useState(''); //'tags=work'
    const [isFetching, setIsFetching] = useState(false);
    // const [adverts, setAdverts] = useState(getAdverts());


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


    function fetchMoreListItems() {
        
        setIsFetching(true);

        setTimeout(() => {            
            getMoreAdverts();
            setIsFetching(false);
        }, 1000);
    }

    const getMoreAdverts = async () => {

        loadMoreAdverts(query);
    };

    return <>

        <div className='container mt-5 mb-5'>
            <div className='card-columns'>
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