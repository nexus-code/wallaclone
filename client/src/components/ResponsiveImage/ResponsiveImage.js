import React from "react";

const path = process.env.REACT_APP_API_IMAGES
const imgFormats = [
    { name: 'xs-', width: '410' },
    { name: 'md-', width: '680' },
    { name: 'lg-', width: '920' },
];

/**
 * 
 * Load responsive image
 */

export default function ResponsiveImage({src, alt, className}){

    return <picture>
        {imgFormats.map(item => <source media={`(max-width: ${item.width}px)`} srcSet={`${path}${item.name}${src}`} key={item.width} />) }
        <img src={`${path}${src}`} alt={alt} className={ className } />
    </picture>  

}