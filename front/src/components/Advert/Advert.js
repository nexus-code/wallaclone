import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import 'moment-timezone';

// https://getbootstrap.com/docs/4.0/components/card/
function Advert(props) {
    
    const { t } = useTranslation();

    
    const goToDetail = () => {
        
        props.history.push(`/advert/${props.advert.id}`);
    };
    
    const { advert } = props;
    // let status = '';

    //     switch (advert.status) {
    //         case 'sold':
    //             status =  `<span>${t(advert.status)}</span>`; break;
    //         case 'reserved':
    //             status = `<span className='reserved'>${t(advert.status)}</span>`; break;
    //         default:
    //             status =  '';
    //     }

    const status = {
        'sold': <span className='advert-header-sold'>{t(advert.status)}</span>,
        'reserved': <span className='advert-header-reserved'>{t(advert.status)}</span>,
        '':''
    }
     
    return (
            <div
                key={ advert.id }
                className={`advert ${advert.type}`}
                onClick={ goToDetail }
            >
                <div className={`advert-header-${advert.type}`}>{t(advert.type)} {status[advert.status]} </div>
                <div className='advert-img'>
                    <img src={ advert.image } alt={ advert.name } />
                </div>

                <div className='advert-body'>
                    <h3>{ advert.name }</h3>
                    <h2 className='text-center'><span className='badge badge-primary'>{ advert.price } €</span></h2>                
                    <p>By: {advert.owner.username}</p>
                    <p><Moment durationFromNow date={advert.created} /></p>
                    <p>
                        {
                            advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> { tag } </span> )
                        }
                    </p>
                </div>
            </div>
    );
}

export default withRouter(Advert);