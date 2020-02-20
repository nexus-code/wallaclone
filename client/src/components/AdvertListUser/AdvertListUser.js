import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from 'react-i18next';

import './advertListUser.css';
/**
 * 
 * List adverts to edit
 * Used on AdvertEdit
 * 
 */
const AdvertItem = props => {
    const { t } = useTranslation();

    const { advert } = props;
    const params = useParams()


    const baseUrl = params.id === undefined ? 'edit/' : '../edit/';

    return <div className={`advertItem ${advert.type}`} key={advert.id}>
        <Link to={`${baseUrl}${advert.id}`}><FontAwesomeIcon icon={faEdit} /> {advert.name} </Link>
        {t(advert.status)}  
        <br/>
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