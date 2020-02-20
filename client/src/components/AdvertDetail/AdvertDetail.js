import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAdvert } from '../../store/adverts/selectors';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareLeft } from "@fortawesome/free-regular-svg-icons";
import Social from '../Social/Social'
import { Helmet } from 'react-helmet';
import Moment from 'react-moment';
import 'moment-timezone';
import ScrollToTopController from "../ScrollToTopController/ScrollToTopController";

import './advertdetail.css';

/**
 * 
 * Show selected advert details.
 * loadAdvert fn, find advert on Store or fetch from API
 * SEO: Helmet
 */

export default function AdvertDetail({ 
        user, 
        adverts, 
        loadAdvert,
        removeAdvert,
        match: {
            params: { id },
        }, 
    }) {

    const { t } = useTranslation();

    useEffect(() => {

        loadAdvert(id);
    }, [loadAdvert, id]);
    
    const advert = getAdvert(adverts, id);
    const history = useHistory();

    const goBack = (style) => <Link to='#' className={style} onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faCaretSquareLeft} /> {t('Go back')}</Link>
    
    if (!advert){
        return <Canvas>
                <div>
                    <h3><br />404. Elemento no encontrado</h3>
                </div>
            </Canvas>
    }

    const status = advert.status === '' ? '' : <span className='advert-status'>  {t(advert.status)}  </span>;

    return <Canvas>
        <Helmet>
            <html lang={ advert.owner.language } amp />
            <title>{ advert.name } | Wallaclone</title>
            <meta name="description" content= {advert.description} />
            <meta name="keywords" content={advert.tags && advert.tags.map(tag => `${tag},`)} />
        </Helmet>

        <ScrollToTopController />
        
        <div className="container">
            <div className="advert-detail">
                <div className={`advert-header advert-header-${advert.type}`}>{status} {t(advert.type)} { goBack('goBackLink right') }</div>
                <h1>{advert.name} <span className='badge badge-primary f-right'>{advert.price}€</span></h1>                
                <ResponsiveImage src={advert.image} alt={advert.name}  />
                <div className={`${advert.type}`}>
                    <div className="advert-info">
                        <Social />
                        <p className="advert-owner">
                            <Link to={`../${advert.owner.username}`}>By: {advert.owner.username}</Link>
                        </p>
                        <p><Moment durationFromNow date={advert.created} /></p>
                        <p>{advert.description}</p>
                        <p>
                            {advert.tags && advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> {tag} </span>)}
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <hr />
                {goBack('goBackLink')}
                <br />

                <br />
            </div>
        </div>
    </Canvas>;

}