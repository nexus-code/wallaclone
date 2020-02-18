/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import './social.css';


export default function Social() {
    
    return <div className="social-container">
            <a className="facebook social" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} title="Compartir en Facebook" target="_blank">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a className="twitter social" href={`https://twitter.com/intent/tweet?source=${window.location.href}`} title="tweet" target="_blank">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
        </div>
} 