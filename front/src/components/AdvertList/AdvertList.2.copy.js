import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Advert from '../Advert/Advert';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { fetchMoreAdverts }  from '../../store/adverts/actions';
import { getAdverts } from '../../store/adverts/selectors';

// font: https://levelup.gitconnected.com/how-to-add-infinite-scrolling-to-your-react-app-efe7002123b8

let page = 0;

export default function AdvertList(props) {

    const [items, setItems] = useState(props.adverts);
    const [initialized, setInitialized] = useState(true);
    // const [totalHits, setTotalHits] = useState(0);

    const getMoreAdverts = async () => {
console.log('clicked', props);

        // page++;
        // const response = await getPhotos(page);
        const response = [];
        props.loadMoreAdverts();

        // const response = getAdverts();

        setItems(getAdverts(props));
        // setTotalHits(response.length);
        setInitialized(true);
    };

    useEffect(() => {
        if (!initialized) {
            getMoreAdverts();
        }
    });


    return <>
        <div className='container mt-5 mb-5'>
            <div className='card-columns'>
                {
                    props.adverts
                    &&
                    props.adverts.length
                    &&
                    props.adverts.map(advert => <Advert advert={advert} key={advert.id} />) 

                    // <InfiniteScroll
                    //     pageStart={0}
                    //     loadMore={getMoreAdverts}
                    //     hasMore={true || false}
                    //     loader={<div className="loader" key={0}>Loading ...</div>}
                    // >
                    //     {adverts.map(advert => <Advert advert={advert} key={advert.id} />)} 
                    // </InfiniteScroll>
                }

                {
                    !props.adverts
                    &&
                    <div className='text-center mt-5'>
                        <h2>No advertisements found</h2>
                    </div>
                }

                <button onClick={getMoreAdverts}>Load more adverts</button>

            </div>
        </div>

    </>
}

AdvertList.propTypes = {
    adverts: PropTypes.array.isRequired
}