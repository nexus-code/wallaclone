import React, { useState, useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { getAdvert } from '../../store/adverts/selectors';
import { useConfirm } from 'material-ui-confirm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import AdvertListUser from '../AdvertListUser';

import './advertEdit.css';

/**
 * 
 * Current user adverts handler: Allows CRUD methods
 * List all his adverts quering by username
 * 
 */

export default function AdvertEdit({
    user,
    advertQuerySet,
    saveAdvert,
    adverts,
    tags,
    removeAdvert,
    loadAdverts,
    match: {
        params: { id },
        path
    },
}) {
    const { t } = useTranslation();

    // Initialize
    // Improve: Reset state.query
    const queryDefault = {
        type: 'all',
        tag: 'all',
        name: '',
        priceFrom: '',
        priceTo: '',
        username: user.username,
        str: '',
        sort: { created: 1 }
    };

    const createAdvertLink = () => <Link to='../edit' className='createLink' >{t('Create advert')}</Link>;

    const loadImage = image => <div>
        {image && <img src={`${process.env.REACT_APP_API_IMAGES}xs-${image}`} alt='' />}
        { !image && 'Without image!' }
    </div>

    // componenDidMount. loads the adverts of the current user
    useEffect(() => {

        const query = {
            ...queryDefault,
            username: user.username,
        }

        advertQuerySet(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // componentWillUnmount. v1: Restore query by default
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => { return async () => { advertQuerySet(queryDefault); }}, []);
    
    
    const [advert, setAdvert] = useState({});
    
    useEffect(() => {
        
        adverts
        &&
        adverts.length
        &&
        setAdvert(getAdvert(adverts, id));
    }, [adverts, id]);
    
          
    const onEdit = id !== undefined;  // Edit when have an advert to did
    const pageTitle = onEdit ? 'Edit advert' : 'Create advert';
    const method = onEdit ? 'PUT' : 'POST';
    
    const [imageFile, setImageFile] = useState();   //form field to upload image
    const [advertImage, setAdvertImage] = useState();   //image name stored in advert
    const [advertTags, setAdvertTags] = useState();   //tags stored in advert
        
    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: advert });

    // loads advert on form with reset function (provided from react-hook-form)
    useEffect(() => {        
        if(advert) {
            reset(advert);
            setAdvertImage(advert.image);
            
            const auxTags = [{ label: 'motor', value: 'motor' }];//advert.tags && advert.tags.map(tag => ({ label: tag, value: tag }))
            
            console.log('advertTags', auxTags);
            setAdvertTags(auxTags);
        }
    }, [advert, reset]);


    const reLoadAdverts = () => {

        setTimeout(() => {
            reset({});
            loadAdverts();
        }, 1000);
    }

    /**
     * Remove advert method
     */
    const confirm = useConfirm();
    const title = t('Confirm to remove advert');
    const msg = t('This action is permanent! The advert will be removed');
    const handleRemove = () => {
        confirm({ title, description: msg })
            .then(() => { 
                removeAdvert(id);
                reLoadAdverts();
            });
    };

    /**
     * Save advert methods
     */

    const onSubmit = data => {

        // must include imageFile to upload it
        data.imageFile = imageFile;

        console.log('onSubmit', data);
        return;


        // return saveAdvert(data, method);
        const newAdvert = saveAdvert(data, method);
        reLoadAdverts();
        return newAdvert;
    }

            
    const validator = (field, minLength, maxLength) => {
        
        const validatorObj = {
            required: t(field) + ` ${t('is required')}`,
            // required: true,
            minLength: {
                value: minLength,
                message: `Min length is ${minLength}`
            },
            maxLength: {
                value: maxLength,
                message: `Max length is ${maxLength}`
            }
        }

        if (field === 'price')
            validatorObj.pattern = '/^\d*\.?\d*$/';

        return validatorObj;
    };
    
    
    const handleImageChange = (e) => {
        e.persist();
        setImageFile(e.target.files[0]); // gets files object
    }


    const handleSelectChange = (e) => {

        const t = e.map(opt => opt.value)
        setAdvertTags(t);
    }

    const animatedComponents = makeAnimated(); //for Select tags

    return (
        <Canvas>
            <div className="container edit-advert">
                <h2>{t(pageTitle)}</h2>
                { onEdit && createAdvertLink() }
                <div className="edit-advert info">
                    {t('advert-edit-instructions')} <FontAwesomeIcon icon={faCommentAlt} />
                </div>

                <div className='edit-advert-grid'>
                    <div>
                        <AdvertListUser />
                    </div>
                    <div className="edit-advert formContainer">
                        { onEdit && <div className="remove"><Link to='#' onClick={handleRemove} className="remove"><FontAwesomeIcon icon={faTrashAlt} /> {t('Remove')}</Link></div> }
                        { onEdit && loadImage(advertImage) }
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <label>{t('Name')}</label>
                            <input
                                name="name"
                                placeholder={t('Product name ')}
                                ref={register(validator('name', 3, 50))}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                            <label>{t('Price')}</label>
                            <input
                                name="price"
                                placeholder={t('Price')}
                                ref={register(validator('price', 3, 25))}
                            />
                            {errors.price && <p>{errors.price.message}</p>}

                            <label>{t('Image')}</label>
                            <input
                                type="file"
                                name="imageFile"
                                placeholder={t('Product image')}
                                onChange={handleImageChange}
                            />
                            {errors.imageFile && <p>{errors.imageFile.message}</p>}

                            <label>{t('Type')}</label>
                            <select ref={register} name="type">
                                <option value="sell">{t('Sell')}</option>
                                <option value="buy">{t('Buy')}</option>
                            </select>

                            <label>{t('Status')}</label>
                            <select ref={register} name="status">
                                <option value="">{t('select')}</option>
                                <option value="reserved">{t('Reserved')}</option>
                                <option value="sold">{t('Sold')}</option>
                            </select>

                            <label>{t('Tags')}</label>
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={handleSelectChange}
                                options={tags.map(tag => ({ label: tag, value: tag }))}
                                // // defaultValue={[{ label: 'motor', value: 'motor' }, { label: 'mobile', value: 'mobile' }]}
                                // defaultValue={advertTags && advertTags.map(tag => ({ label: tag, value: tag }))}
                                defaultValue={ advertTags }
                            />


                            <label>{t('Description')}</label>
                            <textarea
                                name="description"
                                placeholder={t('Product description')}
                                ref={register(validator('description', 3, 250))}
                            />
                            {errors.description && <p>{errors.description.message}</p>}

                            <input type="hidden" name="owner" defaultValue={user.id} ref={register()} />
                            {/* { !onEdit && <input type="hidden" name="owner" defaultValue={user.id} ref={register()} /> } */}
                            { onEdit && <input type="hidden" name="id" defaultValue={id} ref={register()} /> }
                            { onEdit && <input type="hidden" name="image" defaultValue={advertImage} ref={register()} /> }


                            <button type="submit" className="btn btn-outline-primary">{t('Submit')}</button>
                            <button type="reset" className="btn btn-outline-secondary" onClick={() => { reset(advert); }}>{t('Reset')}</button>

                        </form>

                    </div>
                </div>
            </div>
        </Canvas>
    );
}