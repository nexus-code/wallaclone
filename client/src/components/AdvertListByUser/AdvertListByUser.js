import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Canvas from '../Canvas/Canvas';
import AdvertList from '../AdvertList';
import { useTranslation } from 'react-i18next';
import ScrollToTopController from "../ScrollToTopController/ScrollToTopController";

import './advertListByUser.css';

/**
 * Loads adverts by @username
 * 
 */

export default function AdvertListByUser({ 
    advertQuerySet,
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
            
    // componenDidMount. Only query for username
    useEffect(() => {

        const query = {
            ...queryDefault,
            username,
        }

        advertQuerySet(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // componentWillUnmount. v1: Restore query by default. Improve to query reset!
    useEffect(() => {
        return () => {
            advertQuerySet(queryDefault);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Canvas>
        <ScrollToTopController />
        <div className='container text-center'>
            <div className='userPanel'>
                <h2>{t('Adverts by')}: <b>{username}</b></h2>
                [<Link to="/">Close</Link>]
                
            </div>
        </div>

        <AdvertList  />
    </Canvas>
}