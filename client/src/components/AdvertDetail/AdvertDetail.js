import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getAdvert } from '../../store/adverts/selectors';
import Social from '../Social/Social'

import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';

import { Helmet } from 'react-helmet';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";


import './advertdetail.css';

/**
 * 
 * Show selected advert details.
 * loadAdvert fn, find advert on Store or fetch from API
 * Only owner can edit or remove her adverts
 *  SEO: Helmet
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


    /**
     * Unsuscribe
     */
    const confirm = useConfirm();
    const title = t('Confirm to remove advert');
    const msg = t('This action is permanent! The advert will be removed');
    const handleRemove = () => {
        confirm({ title, description: msg })
            .then(() => { removeAdvert(id) });
    };
    ///

    const goBack = <Link to={''} className="icon" onClick={() => history.goBack()}>Go back</Link>
    
    if (!advert){
        return <Canvas>
                <div>
                    <h3>
                        <br />404. Elemento no encontrado
                        
                    </h3>
                </div>
            </Canvas>
    }

                   
    const  ownerActions  = (user && advert.owner._id === user.id) 
            ?  <><div className="owner-actions">
                    <Link to={`/advert/edit/${id}`}>{t('Edit')}</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={''} onClick={handleRemove} className="remove">{t('Remove')}</Link>
                </div>
                </> : '';
                
    const status = advert.status === '' ? '' : <span className='advert-status'>  {t(advert.status)}  </span>;

    return <Canvas>
        <Helmet>
            <html lang={ advert.owner.language } amp />
            <title>{ advert.name } | Wallaclone</title>
            <meta name="description" content= {advert.description} />
            <meta name="keywords" content={advert.tags && advert.tags.map(tag => `${tag},`)} />
        </Helmet>

        <div className="container">
            <div className="advert-detail">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
                <div className={`advert-header advert-header-${advert.type}`}>{status} {t(advert.type)} </div>
                <h1>{advert.name} <span className='badge badge-primary f-right'>{advert.price}€</span></h1>                
                <img src={advert.image} alt={advert.name} />
                <div className={`${advert.type}`}>
                    <div className="advert-owner">
                        By: {advert.owner.username} { ownerActions }                    
                    </div>
                    <div className="advert-info">
                        <p>{advert.description}</p>
                        <p>
                            {advert.tags && advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> {tag} </span>)}
                        </p>
                        <Social url={history.location.path} />
                    </div>

                    
                </div>
                <br />
                <br />
                <hr />
                <Button className='btn btn-dark' onClick={() => history.goBack()}>Go back</Button>
                <br />

                <br />
            </div>
        </div>
    </Canvas>;

}