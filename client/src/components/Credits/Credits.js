import React from 'react';
import Canvas from '../Canvas/Canvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import './credits.css';

export default function Credits() {
    
    
    return <Canvas>
        <div className="container text-center credits mt-5 mb-5">            
            <h1><span>by</span>Miguel Ángel Cárdenas</h1>
            <a className="social" href="mailto:ma.cardenas@nexuscode.com" title="Contacto">ma.cardenas@nexuscode.com</a>
            <a className="social" href='https://www.linkedin.com/in/miguel-angel-cardenas/' title="Mi perfil" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a className="social" href='https://github.com/nexus-code' title="Algunos trabajos" target="_blank">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a className="social" href="http://www.nexuscode.com" title="Más información en nexuscode.com" target="_blank">www.nexuscode.com</a>


        </div>
    </Canvas>

}