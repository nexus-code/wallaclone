import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { getAdvert } from '../../store/adverts/selectors';

import { Facebook, Twitter, Email } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'

import { useTranslation } from 'react-i18next';

import { Button } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';

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
     * Unsuscribe
     */
    const confirm = useConfirm();
    const title = t('Confirm to remove advert');
    const msg = t('This action is permanent! The advert will be removed');
    const handleRemove = () => {
        confirm({ title, description: msg })
            .then(() => { removeAdvert(id) });
    };
    
    
    const editButton = (user && advert.owner._id === user.id) ? <Link to={`/advert/edit/${id}`}>{t('Edit')}</Link> : '';
    const removeButton = (user && advert.owner._id === user.id) ? <Link onClick={handleRemove} >{t('Remove')}</Link> : '';

    if (!advert){
        return <Canvas>
                <div>
                    <h3><br />404. Elemento no encontrado</h3>
                </div>
            </Canvas>
    }

    return <Canvas>

        <div className="container">
            <div>
                <img src={advert.image} alt={advert.name} />
                {editButton} | {removeButton}
                <h1 style={{
                    color: advert.type === 'sell' ? 'green' : 'blue'
                }}>{advert.name} <span className='badge badge-primary'>{advert.price}€</span>
                </h1>
                <Email url={history.location.path } />
                <Facebook url={history.location.path} />
                <Twitter url={history.location.path} />

                <p>By: {advert.owner.username}</p>
                <p>{advert.description}</p>
                <p>
                    { advert.tags && advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> {tag} </span>) }
                </p>
                <br />
                <hr />
                <Button className='btn btn-dark' onClick={() => history.goBack()}>Go back</Button>
                <br />

                <br />
            </div>
        </div>
    </Canvas>;

}