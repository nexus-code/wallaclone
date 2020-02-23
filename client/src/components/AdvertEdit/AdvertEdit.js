import React, { useState, useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { getAdvert } from '../../store/adverts/selectors';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { useConfirm } from 'material-ui-confirm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCommentAlt } from "@fortawesome/free-regular-svg-icons";


import AdvertEditList from '../AdvertEditList';

import './advertEdit.css';

/**
 * 
 * Current user adverts handler: Do CRUD methods
 * List all his adverts quering by username
 * 
 */

const tmpMaxAdverts = 50; //Dev: max adverts or current user number to show

export default function AdvertEdit({
    user,
    advertQuerySet,
    saveAdvert,
    adverts,
    tags,
    removeAdvert,
    loadAdverts,
    match: { params: { id } },
}) {

    /*
     * Initialization
     */

    const { t } = useTranslation();

    // Initialize filer string
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

    // componenDidMount. loads all the current user adverts
    useEffect(() => {

        const query = {
            ...queryDefault,
            limit: tmpMaxAdverts,
            username: user.username,
        }

        advertQuerySet(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // componentWillUnmount. v1: Restore query by default
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { return async () => { advertQuerySet(queryDefault); } }, []);

    /**
     * Loaded advert methods
     */    

    const [advert, setAdvert] = useState({});
    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: advert });

    useEffect(() => {

        adverts && adverts.length && setAdvert(getAdvert(adverts, id));
    }, [adverts, id]);


    // loads advert on form with reset() provided from react-hook-form
    useEffect(() => {
        if (advert) {
            reset(advert);
            setAdvertImage(advert.image);
            setAdvertTags(advert.tags);
            setAdvertType(advert.type);
        } else {
            reset({});
            setAdvertImage('');
            setAdvertTags([]);
            setAdvertType('sell');
        }
    }, [advert, reset]);

    const [imageFile, setImageFile] = useState();   //form field to upload image
    const [advertImage, setAdvertImage] = useState();   //image name stored in advert
    const [advertTags, setAdvertTags] = useState([]);   //tags stored in advert
    const [advertType, setAdvertType] = useState('sell');   //tags stored in advert

    const loadImage = image => <div>
        {image && <img src={`${process.env.REACT_APP_API_IMAGES}xs-${image}`} alt='' />}
        {!image && 'Without image!'}
    </div>

    /**
     * New advert / clear form, toggled by param id
     */
    const onEdit = id !== undefined;  // Edit when have an advert to did
    const createAdvertLink = () => <Link to='../edit' className='createLink' >{t('Create advert')}</Link>;
    const pageTitle = onEdit ? 'Edit advert' : 'Create advert';


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
     * Load & save advert methods
     */
    const onSubmit = data => {

        if (advertTags.length === 0 || !advertImage)
            return

        data.imageFile = imageFile; // must include imageFile to upload it
        data.tags = advertTags;
        data.status = advertType === 'buy' ? '' : data.status;
        data.owner = user.id;

        if (onEdit) {
            data.id = id;
            data.image = advertImage;
        }
        
        const method = onEdit ? 'PUT' : 'POST';

        
        const newAdvert = saveAdvert(data, method);
        reLoadAdverts();
        return newAdvert;
    }

    const reLoadAdverts = () => {

        setTimeout(() => {
            reset({}); //form
            setAdvertType('sell');
            loadAdverts();
        }, 1000);
    }


    /**
     * form methods
     */

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

        return validatorObj;
    };

    const handleImageChange = event => {
        event.persist();
        setImageFile(event.target.files[0]); // gets files object
        setAdvertImage(event.target.files[0]); // gets files object
    }

    const handleTypeChange = event => setAdvertType(event.target.value);

    const handleChangeMultiple = ({ target: { value } }) => setAdvertTags(value)


    // componentWillUnmount. v1: Restore query by default with empty username
    useEffect(() => {
        return () => {
            const _query = {
                ...queryDefault,
                username: '',
            }
            advertQuerySet(_query);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

 
    return (
        <Canvas>
            <div className="container edit-advert">
                <h2>{t(pageTitle)}</h2>
                {onEdit && createAdvertLink()}
                <div className="edit-advert info">
                    {t('advert-edit-instructions')} <FontAwesomeIcon icon={faCommentAlt} />
                </div>

                <div className='edit-advert-grid'>
                    <div>
                        <AdvertEditList />
                    </div>
                    <div className={`edit-advert formContainer ${advertType}`}>
                        {onEdit && <Link to='#' onClick={handleRemove} className="remove"><FontAwesomeIcon icon={faTrashAlt} /> {t('Remove')}</Link>}
                        {onEdit && loadImage(advertImage)}

                        <form onSubmit={handleSubmit(onSubmit)} >

                            <label>{t('Type')}</label>
                            <select ref={register} name="type" onChange={handleTypeChange}>
                                <option value="sell">{t('Sell')}</option>
                                <option value="buy">{t('Buy')}</option>
                            </select>

                            {
                                advertType === 'sell' 
                                &&
                                <>
                                    <label>{t('Status')}</label>
                                    <select ref={register} name="status">
                                        <option value="">{t('Waiting')}</option>
                                        <option value="reserved">{t('Reserved')}</option>
                                        <option value="sold">{t('Sold')}</option>
                                    </select>
                                </>
                            }

                            <label>{t('Name')}</label>
                            <input
                                name="name"
                                placeholder={t('Product name ')}
                                ref={register(validator('name', 5, 50))}
                            />
                            {errors.name && <p>{errors.name.message}</p>}

                            <label>{t('Price')}</label>
                            <input
                                name="price"
                                type="number"
                                placeholder={t('Price')}
                                ref={register(validator('price', 1, 7))}
                            />
                            {errors.price && <p>{errors.price.message}</p>}

                            <label>{t('Image')}</label>
                            {onEdit && <p>{t('image-instructions')}</p>}
                            <input
                                type="file"
                                name="imageFile"
                                placeholder={t('Product image')}
                                onChange={handleImageChange}
                            />
                            {!advertImage && <p>mandatory</p>}                    

                            <label>{t('Tags')}</label>

                            <Select
                                multiple
                                name="tags"
                                value={advertTags || []}
                                onChange={handleChangeMultiple}
                                renderValue={() => (
                                    <div>
                                        {advertTags && advertTags.map(value => (
                                            value && <Chip
                                                key={value}
                                                label={value}
                                            />
                                        ))}
                                    </div>
                                )}
                            >
                                {tags &&
                                    tags.map((value, key) => {
                                        return (
                                            <MenuItem key={key} value={value}>
                                                <Chip
                                                    key={key}
                                                    label={value}
                                                />
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                            {(advertTags && advertTags.length === 0) && <p>mandatory</p>}


                            <label>{t('Description')}</label>
                            <textarea
                                name="description"
                                placeholder={t('Product description')}
                                ref={register(validator('description', 5, 400))}
                            />
                            {errors.description && <p>{errors.description.message}</p>}

                            <button type="submit" className="btn btn-outline-primary">{t('Submit')}</button>
                        </form>

                    </div>
                </div>
            </div>
        </Canvas>
    );
}