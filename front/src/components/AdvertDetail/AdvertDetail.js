import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';

import { getAdvert } from '../../store/adverts/selectors';

import { Facebook, Twitter, Email } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'

import { Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';

/**
 * 
 * Show selected advert details.
 * loadAdvert find advert on Store or fetch from API
 * 
 */

export default function AdvertDetail({ 
        user, 
        adverts, 
        loadAdvert,
        match: {
            params: { id },
        }, 
    }) {

    // const { t } = useTranslation();

    useEffect(() => {

        loadAdvert(id);
    }, [loadAdvert, id]);
    
    const advert = getAdvert(adverts, id);
    const history = useHistory();
    
    if (!advert){
        return <Canvas>
                <div>
                    <h3><br />404. Elemento no encontrado</h3>
                </div>
            </Canvas>
    }
    
    const editButton =  advert.owner._id === user.id ? <Button className='btn btn-warning right' onClick={() => history.push(`/advert/edit/${id}`)} >Edit</Button> : '';
    
    return <Canvas>

        <div className="container">
            <div>
                <img src={advert.image} alt={advert.name} />

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
                <br />
                { editButton }
                <Button className='btn btn-dark' onClick={() => history.goBack()}>Go back</Button>
            </div>
        </div>
    </Canvas>;

}