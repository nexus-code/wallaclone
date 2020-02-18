import React, { useState, useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useHistory } from 'react-router';

import { getAdvert } from '../../store/adverts/selectors';

import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

// import TagSelect from '../TagsSelect/TagSelect'

export default function AdvertEdit({
    user,
    adverts,
    loadAdvert,
    saveAdvert,
    match: {
        params: { id },
        path
    },
    }) {

    const { t } = useTranslation();

    useEffect(() => {
        loadAdvert(id);
    }, [loadAdvert, id]);

    const [imageFile, setImageFile] = useState();

    const advert = getAdvert(adverts, id);

    const onEdit = path !== '/advert/create';
    const pageTitle = onEdit ? 'Edit advert' : 'Create advert';
    const method = onEdit ? 'PUT' : 'POST';
    const history = useHistory();

    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: advert });

    const onSubmit = data => {

        // must include imageFile to upload it
        data.imageFile = imageFile;

        return saveAdvert(data, method);
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


    const handleChange = (e) => {
        e.persist();
        setImageFile(e.target.files[0]); // gets files object
    }

    if (onEdit && advert.owner._id !== user.id) {
        return <Canvas>
            <div>
                <h3><br />404. Elemento no encontrado</h3>
            </div>
        </Canvas>
    }

    return (
        <Canvas>

            <div className="formContainer">
                <h2>{t(pageTitle)}</h2>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <label>{t('Name')}</label>
                    <input
                        name="name"
                        placeholder={t('Product name')}
                        ref={register(validator('name', 3, 50))}
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
                        type="file"
                        name="imageFile"
                        placeholder={t('Product image')}
                        onChange={handleChange}
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

                    {/* <label>{t('Tags')}</label> */}

                    <label>{t('Description')}</label>
                    <textarea
                        name="description"
                        placeholder={t('Product description')}
                        ref={register(validator('description', 3, 250))}
                    />
                    {errors.description && <p>{errors.description.message}</p>}

                    {onEdit && <input type="hidden" name="id" defaultValue={id} ref={register()} />}
                    {/* {!onEdit && <input type="hidden" name="owner" defaultValue={user.id} ref={register()} />} */}
                    <input type="hidden" name="owner" defaultValue={user.id} ref={register()} />
                    {/* <input type="hidden" name="image" defaultValue={advert.image} ref={register()} /> */}

                    <input type="submit" value={t('Submit')} />

                    {onEdit && <input type="button" value={t('Reset')} onClick={() => { reset(advert); }} />}
                </form>

                {onEdit && <button variant="secondary" className="float-right" onClick={() => history.push(`../${id}`)}>View advert</button>}


                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}