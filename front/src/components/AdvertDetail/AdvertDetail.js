import React, { useEffect } from "react";
import Canvas from '../Canvas/Canvas';
import { useParams, useHistory } from 'react-router';

import { getAdvert }  from '../../store/adverts/selectors';

import { Button } from 'react-bootstrap';


export default function AdvertDetail(props) {


    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        props.loadAdvert(id);
    }, [props, id]);

    const advert = getAdvert(props, id);

    return <Canvas>

        <div className="container">
            {
                advert
                &&
                <div>
                    <img src={advert.image} alt={advert.name} />

                    <h1 style={{
                        color: advert.type === 'sell' ? 'green' : 'blue'
                    }}>{advert.name} <span className='badge badge-primary'>{advert.price}€</span>
                    </h1>
                    <p>{advert.description}</p>
                    <p>
                       { advert.tags && advert.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> {tag} </span>) }
                    </p>
                    <br />
                    <hr />
                    <br />
                    <Button className='btn btn-warning' onClick={() => history.push(`/advert/edit/${id}`)} style={{ float: 'right' }} >Edit</Button>
                    <Button className='btn btn-dark' onClick={() => history.goBack()}>Go back</Button>
                </div>
            }
            {
                !advert
                &&
                <div>
                    <h3><br />404. Elemento no encontrado</h3>
                </div>
            }
        </div>
    </Canvas>;

}