import React from 'react';
import { Link } from 'react-router-dom';
import Canvas from '../Canvas/Canvas';


export default function NotFoundPage(){

    return <Canvas>
        <div style={{ textAlign: 'center', padding: '60px' }}>
            {/* <img src={PageNotFound} /> */}
            <h1>OPPs! 404</h1>
            <p>
                <Link to="/">Go to Home </Link>
            </p>
        </div>

    </Canvas>
}