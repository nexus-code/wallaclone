import React  from "react";
import Canvas from '../Canvas/Canvas';

import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

import { useParams, useHistory } from 'react-router';
import { getAd } from '../../store/ads/selectors';
// import TagSelect from '../TagsSelect/TagSelect'

const TYPES = ['sell', 'buy'];

export default function AdEdit(props) {

    const { t } = useTranslation();
        
    const onEdit = props.match.path !== '/advert/create';
    const pageTitle  = onEdit ? 'Edit advert' : 'Create advert';
    const method = onEdit ? 'PUT' : 'POST';
    
    console.log('AdEdit', props.match, onEdit, method);

    let  ad = {
        id: '',
        name: '',
        price: '',
        description: '',
        type: TYPES[0],
        image: '',
        tags: []
    };
    
    const history = useHistory();
    const { id } = useParams();
    
    if (id !== undefined) {
        
        ad = getAd(props, id);
    
    } 
    
    if (ad.id === undefined){
        // load out of redux
        history.push('/');
    }

    console.log('ad', ad.id);
    
    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: ad });

    const onSubmit = data => {
        
        return props.savedAd(data, method);
    }
    
    const validator = (field, minLength, maxLength) => ({
        required: t(field) + ` ${t('is required')}`,
        minLength: {
            value: minLength,
            message: `Min length is ${minLength}`
        },
        maxLength: {
            value: maxLength,
            message: `Max length is ${maxLength}`
        }
    });

    return (
        <Canvas>
            
            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>{t(pageTitle)}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{t('Name')}</label>
                    <input
                        name="name"
                        placeholder={t('Product name')}
                        ref={register(validator('name', 3, 25))}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    
                    <label>{t('Price')}</label>
                    <input
                        name="price"
                        placeholder={t('Product price')}
                        ref={register(validator('price', 3, 25))}
                    />
                    {errors.price && <p>{errors.price.message}</p>}

                    <label>{t('Image')}</label>
                    <input
                        name="image"
                        placeholder={t('Product image')}
                        ref={register(validator('image', 3, 120))}
                    />
                    {errors.image && <p>{errors.image.message}</p>}

                    <label>{t('Type')}</label>
                    <select ref={register} name="type">
                        <option value="sell">{t('Sell')}</option>
                        <option value="buy">{t('Buy')}</option>
                    </select>

                    {/* <label>{t('Tags')}</label> */}

                    { onEdit && <input type="hidden" name="id" defaultValue={id} ref={register()} /> }

                    <input type="submit" value={t('Submit')} />
                    
                    {onEdit && <input type="button" value={t('Reset')} onClick={() => { reset(ad); }} /> }
                </form>

                {onEdit && <button variant="secondary" className="float-right" onClick={() => history.push(`../${id}`)}>View advert</button> }

                
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}