import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * 
 * List adverts to edit
 * 
 */
const AdvertItem = props => {

    const { advert } = props;

    return <div key={advert.id}>
        <Link to={advert.id}>{advert.name} </Link>
         {advert.type}  | {advert.status}<br/>
    </div>
}


export default function AdvertListUser({ adverts }) {


    return <>
        {
            adverts
            &&
            adverts.length
            &&
            adverts.map(advert => <AdvertItem advert={advert} key={advert.id} />)
        }
        {
            !adverts
            &&
            <div className='text-center mt-5'>
                <h2> No advertisements found</h2>
            </div>
        }
    </>
}

AdvertListUser.propTypes = {
    adverts: PropTypes.array.isRequired
}