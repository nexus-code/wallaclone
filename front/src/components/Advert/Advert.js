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
    
    return (
            <div
                style={{
                    cursor: 'pointer',
                    borderColor: advert.type === 'sell' ? 'orange' : 'blue'
                }}
                key={ advert.id }
                className='card'
                onClick={ goToDetail }
            >
                <div className='card-header'
                    style={{
                        color: advert.type === 'sell' ? 'orange' : 'blue',
                        textTransform: 'uppercase'
                    }}
                >{t(advert.type)}</div>
                <img className='card-img-top text-center'  src={ advert.image } alt={ advert.name } />
                <div className='card-body'>
                    <h5 className='card-title'>{ advert.name }</h5>
                <p>By: {advert.owner.username}</p>
                    <h2 className='text-center'><span className='badge badge-primary'>{ advert.price } €</span></h2>                
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