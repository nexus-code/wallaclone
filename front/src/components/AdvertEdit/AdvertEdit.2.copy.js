import React, { useState }   from "react";
import Canvas from '../Canvas/Canvas';

import useForm from '../Form/useForm';
import { Form, Button } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { useParams, useHistory } from 'react-router';
import { getAdvert } from '../../store/adverts/selectors';
import TagSelect from '../TagsSelect/TagSelect'

const TYPES = ['sell', 'buy'];

export default function AdvertEdit(props) {

    const { t } = useTranslation();
        
    const onEdit = props.match.path !== '/advert/create';
    const pageTitle  = onEdit ? 'Edit advert' : 'Create advert';
    const method = onEdit ? 'PUT' : 'POST';
    
    let  advert = {
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

    
    
    // const { register, handleSubmit, reset, errors } = useForm({ defaultValues: advert });
    // const validator = (field, minLength, maxLength) => ({
        //     required: t(field) + ` ${t('is required')}`,
        //     minLength: {
            //         value: minLength,
            //         message: `Min length is ${minLength}`
    //     },
    //     maxLength: {
        //         value: maxLength,
        //         message: `Max length is ${maxLength}`
        //     }
    // });
    // const onSubmit = data => {
        
        //     // data.imageFile = imageFile;
        
        //     // console.log('data send onSubmit', data);
        
        //     const formData = new FormData();
        //     formData.apppend('imageFile', imageFile);
        
        //     console.log('formData send onSubmit', formData);
        
        
        //     //return props.saveAdvert(data, method);
        // }
        
        
        const handleSubmitCallback = (event) => {
            
            console.log('event', event);
            console.log('event', event.target);
            console.log('formInput', formInput);

            // console.log('formData', formInput.FormData);

            // formInput.FormData.append('imageFile', imageFile);
            // console.log('formData', formInput.FormData);

            let formData = new FormData(event.target);
            formData.append('imageFile', imageFile);
            // formData = {...formInput};
            console.log('formData', formData);

            return props.saveAdvert(formData, method);
        }

        const [handleChange, handleSubmit, formInput] = useForm(advert, handleSubmitCallback);



    const [imageFile, setImageFile] = useState();

    const handleFileChange = (e) => {
        e.persist();

        setImageFile(e.target.files[0]); // you get all the files object here
    }

    return (
        <Canvas>
            
            <div style = {{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>{t(pageTitle)}</h2>

                <Form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <Form.Group controlId="formGroupName" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Product name" value={formInput.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPrice" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" placeholder="on €" value={formInput.price} onChange={handleChange} type="number" />
                    </Form.Group>
                    <Form.Group controlId="formGroupimageFile" >
                        <Form.Label>{t('Product image')}</Form.Label>
                        <Form.Control type="file" name="imageFile" placeholder="Select a prety image" value={formInput.imageFile} onChange={handleFileChange} />
                    </Form.Group>

                    <Form.Group controlId="formGroupType" >
                        <Form.Label>Type</Form.Label>
                        {TYPES.map(type => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline type='radio' id={`check-api-${type}`}>
                                    <Form.Check.Input
                                        name='type'
                                        value={`${type}`}
                                        type='radio'
                                        onChange={handleChange}
                                        checked={`${type}` === formInput.type}
                                    />
                                    <Form.Check.Label style={{ textTransform: 'capitalize' }}>{` ${type}`}</Form.Check.Label>
                                </Form.Check>
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" value={formInput.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGrouptags" >
                        <Form.Label>Tag</Form.Label>
                        <TagSelect onChange={handleChange} value={formInput.tags} isMulti />
                    </Form.Group>

                    { onEdit && <input type = "hidden" name = "id" defaultValue = {id} /> }

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="secondary" className="float-right" onClick={() => history.push(`../${id}`)}>View advert</Button>
                </Form>



                {/* <form onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
                    <label>{t('Name')}</label>
                    <input
                        name = "name"
                        placeholder = {t('Product name')}
                        ref = {register(validator('name', 3, 25))}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    
                    <label>{t('Price')}</label>
                    <input
                        name = "price"
                        placeholder = {t('Product price')}
                        ref = {register(validator('price', 3, 25))}
                    />
                    {errors.price && <p>{errors.price.message}</p>}

                    <label>{t('Image')}</label>
                    <input
                    type="file"
                        name = "imageFile"
                        placeholder = {t('Product image')}
                        onChange={handleFileChange}
                    />
                    {errors.imageFile && <p>{errors.imageFile.message}</p>}

                    <label>{t('Type')}</label>
                    <select ref = {register} name = "type">
                        <option value = "sell">{t('Sell')}</option>
                        <option value = "buy">{t('Buy')}</option>
                    </select>

                    <label>{t('Tags')}</label> 

                    <label>{t('Description')}</label>
                    <textarea
                        name = "description"
                        placeholder = {t('Product description')}
                        ref = {register(validator('description', 3, 250))}
                    />
                    {errors.description && <p>{errors.description.message}</p>}

                    { onEdit && <input type = "hidden" name = "id" defaultValue = {id} ref = {register()} /> }

                    <input type = "submit" value = {t('Submit')} />
                    
                    {onEdit && <input type = "button" value = {t('Reset')} onClick = {() => { reset(advert); }} /> }
                </form> */}

                {onEdit && <button variant = "secondary" className = "float-right" onClick = {() => history.push(`../${id}`)}>View advert</button> }

                
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}