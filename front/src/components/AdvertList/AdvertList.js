import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Advert from '../Advert/Advert';
import { getAdverts } from '../../store/adverts/selectors';

// font: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks

export default function AdvertList({ adverts, loadMoreAdverts }) {

    const [listItems, setListItems] = useState(adverts);
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

    function fetchMoreListItems() {
        setTimeout(() => {
            
            getMoreAdverts();
            setListItems(getAdverts(adverts));

            setIsFetching(false);
        }, 2000);
    }

    const getMoreAdverts = async () => {

        loadMoreAdverts();

        setListItems(getAdverts(adverts));
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