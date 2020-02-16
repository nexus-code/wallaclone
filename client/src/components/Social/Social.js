import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './social.css';

export default function Social({ url }) {
    return (
        <div className="social-container">
            <a href={url} className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href={url} className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href={url} className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
        </div>
    );
}