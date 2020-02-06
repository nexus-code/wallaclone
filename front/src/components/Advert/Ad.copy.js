import React from "react";
import { withRouter } from "react-router-dom";

import { withTranslation } from 'react-i18next';


// https://getbootstrap.com/docs/4.0/components/card/
class Ad extends React.Component {
    
    
    
    goToDetail = () => {
        
        this.props.history.push(`/advert/${this.props.ad.id}`);
    };
    
    render() {
        
        // const { t } = withTranslation();
        const { t, ad } = this.props;
        
        return (
            
                <div
                    style={{
                        cursor: 'pointer',
                        borderColor: ad.type === 'sell' ? 'orange' : 'blue'
                    }}
                    key={ ad.id }
                    className='card'
                    onClick={ this.goToDetail }
                >
                    <div className='card-header'
                        style={{
                            color: ad.type === 'sell' ? 'orange' : 'blue',
                            textTransform: 'uppercase'
                        }}
                    >{t(ad.type)}</div>
                    <img className='card-img-top text-center'  src={ ad.image } alt={ ad.name } />
                    <div className='card-body'>
                        <h5 className='card-title'>{ ad.name }</h5>
                        <h2 className='text-center'><span className='badge badge-primary'>{ ad.price } €</span></h2>                
                        <p className='card-text'>{ ad.description }</p>
                        <p>
                            {
                                ad.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> { tag } </span> )
                            }
                        </p>
                    </div>
                </div>
        );
    }
}

export default withRouter(Ad);