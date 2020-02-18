import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import AdvertList from '../AdvertList';
import { useTranslation } from 'react-i18next';

import './userView.css';

/**
 * Loads @username adverts
 * 
 */

export default function UserView({ 
    advertQuerySet,
    props,
    match: {
        params: { username },
        },
    }) {

    const { t } = useTranslation();

       
    // Improve: Reset state.query
    const queryDefault = {
            type: 'all',
            tag: 'all',
            name: '',
            priceFrom: '',
            priceTo: '',
            username: '',
            str: '',
            sort: { created: 1 }
        };
            
    // On load component
    useEffect(() => {

        const query = {
            ...queryDefault,
            username,
        }

        advertQuerySet(query);
    }, []);

    const _componentWillUnmount = () => {
        console.log('Bieee!!!!')
    }

    useEffect(() => {
        window.addEventListener('unhandledRejection', _componentWillUnmount());
        return () => {
            window.removeEventListener('unhandledRejection', _componentWillUnmount());
        }
    }, [])

    return <Canvas>

        <div className='container mt-5 mb-5 '>
            <div className='userPanel'>
                <h2>{t('Adverts by')}: <b>{username}</b></h2>
            </div>
        </div>

        <AdvertList  />
    </Canvas>
}