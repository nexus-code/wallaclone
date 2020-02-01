import React  from "react";
import Canvas from '../Canvas/Canvas';

import { useParams, useHistory } from 'react-router';
import useForm from '../Form/useForm';
import { Form, Button } from 'react-bootstrap';
import { getAd } from '../../store/ads/selectors';
import TagSelect from '../TagsSelect/TagSelect'

const TYPES = ['sell', 'buy'];

function AdEdit(props) {

    const adding = props.match.path === '/advert/create';
    const title  = adding ? 'Create advert' : 'Edit advert';
    const method = adding ? 'POST' : 'PUT';

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

    const handleSubmitCallback = () => {

        return props.savedAd(formInput, method, ad.id);
    }
    
    const [handleChange, handleSubmit, formInput] = useForm(ad, handleSubmitCallback );

    return <Canvas>
            
            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>{title}</h2>
            <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupName" >
                        <Form.Label>Name</Form.Label>
                    <Form.Control name="name" placeholder="Product name" value={formInput.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPrice" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" placeholder="on €" value={formInput.price} onChange={handleChange} type="number" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPhoto" >
                        <Form.Label>Photo</Form.Label>
                        <Form.Control name="photo" placeholder="Select a prety photo" value={formInput.image} onChange={handleChange} />
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

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                <Button variant="secondary" className="float-right" onClick={() => history.push(`../${id}`)}>View advert</Button>
                </Form>
            </div>
        </Canvas>
}

export default AdEdit;