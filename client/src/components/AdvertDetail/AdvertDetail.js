import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getAdvert } from '../../store/adverts/selectors';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareLeft, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useConfirm } from 'material-ui-confirm';
import Social from '../Social/Social'
import { Helmet } from 'react-helmet';

import './advertdetail.css';

/**
 * 
 * Show selected advert details.
 * loadAdvert fn, find advert on Store or fetch from API
 * Only owner can edit or remove her adverts
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

    const goBack = (style) => <Link to='#' className={style} onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faCaretSquareLeft} /> {t('Go back')}</Link>
    
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
            <Link to={`/advert/edit/${id}`}><FontAwesomeIcon icon={faEdit} /> {t('Edit')}</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={''} onClick={handleRemove} className="remove"><FontAwesomeIcon icon={faTrashAlt} /> {t('Remove')}</Link>
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
                <div className={`advert-header advert-header-${advert.type}`}>{status} {t(advert.type)} { goBack('goBackLink right') }</div>
                <h1>{advert.name} <span className='badge badge-primary f-right'>{advert.price}€</span></h1>                
                <img src={advert.image} alt={advert.name} />
                <div className={`${advert.type}`}>
                    <div className="advert-owner">
                        By: {advert.owner.username} { ownerActions }                    
                    </div>
                    <Social />
                    <div className="advert-info">
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