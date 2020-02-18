/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import './social.css';


export default function Social() {
    
    return <div className="social-container">
        <Link className="facebook social" to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} title="Compartir en Facebook" target="_blank">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
        </Link>
        <Link className="twitter social" to={`https://twitter.com/intent/tweet?source=${window.location.href}`} title="tweet" target="_blank">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
        </Link>
    </div>
} 