import React from 'react';
import Canvas from '../Canvas/Canvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import './credits.css';

export default function Credits() {
    
    
    return <Canvas>
        <div className="container text-center credits mt-5 mb-5">            

            <p>Gracias al equipo de <a href="https://keepcoding.io/es" title="keepcoding.io">keepcoding.io</a>. Especialmente a 
            los profesores de la VII edición del Fullstack Web Bootcamp.
            <br/>
            Gracias también a mis compañeros. Aunque sólo los he podido escuchar en diferido, sus aportes y motivación han sido muy enriquecedores.</p>
            <h1><span>by</span>Miguel Ángel Cárdenas</h1>
            <a className="social" href="mailto:ma.cardenas@nexuscode.com" title="Contacto">ma.cardenas@nexuscode.com</a>
            <a className="social" href='https://www.linkedin.com/in/miguel-angel-cardenas/' title="Mi perfil" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a className="social" href='https://github.com/nexus-code' title="Algunos trabajos" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a className="social" href="http://www.nexuscode.com" title="Más información en nexuscode.com" rel="noopener noreferrer" target="_blank">www.nexuscode.com</a>
            <p className="info">Wallaclone es un ejercicio práctico con fines didácticos. Imágenes tomadas de <a href="https://pixabay.com/es/" rel="noopener noreferrer" target="_blank">Pixabay</a></p>

        </div>
    </Canvas>

}