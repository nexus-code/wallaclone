import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import 'moment-timezone';

export default function Advert(props) {
    
    const { t } = useTranslation();
   
    const { advert } = props;
    const status = {
        'sold': <span className='advert-header-sold'>{t(advert.status)}</span>,
        'reserved': <span className='advert-header-reserved'>{t(advert.status)}</span>,
        '':''
    }
     
    return <>
        <div key={ advert.id } className={`advert ${advert.type}`}>
            <div className={`advert-header advert-header-${advert.type}`}>{t(advert.type)} {status[advert.status]} </div>
                <div className='advert-img'>
                    <Link to={`/advert/${props.advert.id}`}><img src={advert.image} alt={advert.name} /></Link>
                </div>
                <div className='advert-body'>
                    <Link to={`/advert/${props.advert.id}`}><h3>{ advert.name }</h3> </Link>
                    <h2 className='right'><span className='badge badge-primary'>{ advert.price } €</span></h2>                
                    <p>By: {advert.owner.username}</p>
                    <p><Moment durationFromNow date={advert.created} /></p>
                    <p>
                        {
                            advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> { tag } </span> )
                        }
                    </p>
                </div>
            </div>
        </>           
}