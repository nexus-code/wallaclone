import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { getAdvert } from '../../store/adverts/selectors';

import { Facebook, Twitter, Email } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';

import { Helmet } from 'react-helmet';

import './advertdetail.css';

/**
 * 
 * Show selected advert details.
 * loadAdvert fn, find advert on Store or fetch from API
 * Only owner can edit or remove her adverts
 * 
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
     * SEO: Helmet
     */


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

    const goBack = <Link to={''} className="icon" onClick={() => history.goBack()}><ArrowBackIcon /></Link>
    
    if (!advert){
        return <Canvas>
                <div>
                    <h3>
                        <br />404. Elemento no encontrado
                        
                    </h3>
                </div>
            </Canvas>
    }

    const social = <div className="advert-detail social" >
        <Link to={history.location.path}><FacebookIcon /></Link>
        <Link to={history.location.path}><TwitterIcon /></Link>
            <Link to={history.location.path}>envelope</Link>
        </div>;
                    
    const  ownerActions  = (user && advert.owner._id === user.id) 
            ?  <><div className="owner-actions">
                    <Link to={`/advert/edit/${id}`}>{t('Edit')}</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link onClick={handleRemove} className="remove"><DeleteForeverIcon /> {t('Remove')}</Link>
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
                
                <div className={`advert-header advert-header-${advert.type}`}>{status} {t(advert.type)} </div>
                <h1>{advert.name} <span className='badge badge-primary f-right'>{advert.price}€</span></h1>                
                <img src={advert.image} alt={advert.name} />
                <div class={`${advert.type}`}>
                    <div className="advert-owner">
                        By: {advert.owner.username} { ownerActions }                    
                    </div>
                    <div className="advert-info">
                        <p>{advert.description}</p>
                        {
                            social
                        }
                        <p>
                            {advert.tags && advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> {tag} </span>)}
                        </p>
                    </div>

                    
                </div>
                
                
                
                <br />
                {/* <Email url={history.location.path } />
                <Facebook url={history.location.path} />
                <Twitter url={history.location.path} /> */}

                
                <br />
                <hr />
                <Button className='btn btn-dark' onClick={() => history.goBack()}>Go back</Button>
                <br />

                <br />
            </div>
        </div>
    </Canvas>;

}