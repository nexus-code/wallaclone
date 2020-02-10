import React, { useState } from "react";
import Canvas from '../Canvas/Canvas';

import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

import { useParams, useHistory } from 'react-router';
import { getAdvert } from '../../store/adverts/selectors';
// import TagSelect from '../TagsSelect/TagSelect'

const TYPES = ['sell', 'buy'];

export default function AdvertEdit(props) {

    const { t } = useTranslation();

    const onEdit = props.match.path !== '/advert/create';
    const pageTitle = onEdit ? 'Edit advert' : 'Create advert';
    const method = onEdit ? 'PUT' : 'POST';

    let advert = {
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

    if (id !== undefined)
        advert = getAdvert(props, id);


    // load out of redux
    // if (ad.id === undefined)
    //     history.push('/');

    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: advert });

    const onSubmit = data => {

        // data.imageFile = imageFile;

        // console.log('data send onSubmit', data);

        console.log('imageFile', imageFile);

        // imageFile.originalname = imageFile.name;
        // imageFile.mimetype = imageFile.type;
        // imageFile.encoding = imageFile.size;

        let formData = new FormData();
        formData.append('imageFile', imageFile);
        data.imageFile = formData.get('imageFile');
        
        // data.imageFile = imageFile;

        console.log('data', data);

        return props.saveAdvert(data, method);
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

    const [imageFile, setImageFile] = useState();

    const handleChange = (e) => {
        e.persist();

        setImageFile(e.target.files[0]); // you get all the files object here
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

                    {/* <label>{t('Tags')}</label> */}

                    <label>{t('Description')}</label>
                    <textarea
                        name="description"
                        placeholder={t('Product description')}
                        ref={register(validator('description', 3, 250))}
                    />
                    {errors.description && <p>{errors.description.message}</p>}

                    {onEdit && <input type="hidden" name="id" defaultValue={id} ref={register()} />}
                    <input type="hidden" name="owner" defaultValue={props.user.user.id} ref={register()} />

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