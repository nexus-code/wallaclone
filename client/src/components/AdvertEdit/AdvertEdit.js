import React, { useState, useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { getAdvert } from '../../store/adverts/selectors';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { useConfirm } from 'material-ui-confirm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCommentAlt } from "@fortawesome/free-regular-svg-icons";


import AdvertListUser from '../AdvertListUser';

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

    /*****************************************************
     * initialization elements
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


    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }));

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'work',
        'lifestyle',
        'mobile',
        'motor',
    ];

    function getStyles(name, personName, theme) {
        return {
            fontWeight: 400
            // personName.indexOf(name) === -1
            // ? theme.typography.fontWeightRegular
            // : theme.typography.fontWeightMedium,
        };
    }

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

    /*****************************************************
     * Select advert methods
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
            console.log('advert.tags', advert.tags);
            setAdvertTags(advert.tags);//*********************************************************************
        }
    }, [advert, reset]);


    const createAdvertLink = () => <Link to='../edit' className='createLink' >{t('Create advert')}</Link>;

    const loadImage = image => <div>
        {image && <img src={`${process.env.REACT_APP_API_IMAGES}xs-${image}`} alt='' />}
        {!image && 'Without image!'}
    </div>

    const onEdit = id !== undefined;  // Edit when have an advert to did
    const pageTitle = onEdit ? 'Edit advert' : 'Create advert';
    const method = onEdit ? 'PUT' : 'POST';

    const [imageFile, setImageFile] = useState();   //form field to upload image
    const [advertImage, setAdvertImage] = useState();   //image name stored in advert
    const [advertTags, setAdvertTags] = useState();   //tags stored in advert


    const reLoadAdverts = () => {

        setTimeout(() => {
            reset({}); //form
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

        if (!advertTags || !advertImage)
            return

        // must include imageFile to upload it
        data.imageFile = imageFile;
        data.tags = advertTags;
        data.owner = user.id;

        if (onEdit) {
            data.id = id;
            data.image = advertImage;
        }

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

        return validatorObj;
    };


    const handleImageChange = (e) => {
        e.persist();
        setImageFile(e.target.files[0]); // gets files object
        setAdvertImage(e.target.files[0]); // gets files object
    }


    const handleSelectTagsChange = options => {

        const t = options && options.map(opt => opt.value)
        setAdvertTags(t);
    }


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

    /**
     * ***********************************************************************************************
     */
    const [personName, setPersonName] = React.useState([]);
    const handleChange = event => {
        setPersonName(event.target.value);
    };

    /**
     * ***********************************************************************************************
     */



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
                        <AdvertListUser />
                    </div>
                    <div className="edit-advert formContainer">
                        {onEdit && <div className="remove"><Link to='#' onClick={handleRemove} className="remove"><FontAwesomeIcon icon={faTrashAlt} /> {t('Remove')}</Link></div>}
                        {onEdit && loadImage(advertImage)}

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
                            {/* <Select
                                isMulti
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                onChange={handleSelectTagsChange}
                                styles={reactSelectStyles}
                                options={tags.map(tag => ({ label: tag, value: tag }))}
                                defaultValue={advertTags && advertTags.map(tag => ({ label: tag, value: tag })) }
                            />                            
                            */}
                            {console.log('advert.tags', advert.tags)}
                            {console.log('advertTags', advertTags)}
                            <Select
                                multiple
                                name="tags"
                                value={advertTags || []}
                                onChange={handleChangeMultiple}
                                renderValue={() => (
                                    <div>
                                        {advertTags && advertTags.map(value => (
                                            <Chip
                                                key={value}
                                                size="small"
                                                label={value}
                                                className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
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
                                                    size="small"
                                                    label={value}
                                                    className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                                                />
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                            {!advertTags && <p>mandatory</p>}


                            <label>{t('Description')}</label>
                            <textarea
                                name="description"
                                placeholder={t('Product description')}
                                ref={register(validator('description', 3, 250))}
                            />
                            {errors.description && <p>{errors.description.message}</p>}

                            <button type="submit" className="btn btn-outline-primary">{t('Submit')}</button>
                            <button type="reset" className="btn btn-outline-secondary" onClick={() => { reset(advert); }}>{t('Reset')}</button>

                        </form>

                    </div>
                </div>
            </div>
        </Canvas>
    );
}