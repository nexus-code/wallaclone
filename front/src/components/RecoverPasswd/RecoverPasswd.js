import React from "react";
import Canvas from '../Canvas/Canvas';
import { useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';

/**
 * 
 * Recover user password
 */

export default function RecoverPasswd() { 

    const { t } = useTranslation();
    
    const { register, handleSubmit, reset, errors } = useForm({});

    
    const onSubmit = data => {

        // changeLanguage(data.language);       
        
        // if (onEdit && data.password === '')
        //     delete data.password;
        
        // setUser(data, method);
    };

  
    const validator = (field, minLength, maxLength) => ({
            required: t(field) + ` ${t('is required')}`,
            minLength: {
                value: minLength,
                message: `Min length is ${minLength}`
            },
            maxLength: {
                value: maxLength,
                message: `Max length is ${maxLength}`
            }
    });
    
    
    return (
        <Canvas>
            <div className="formContainer">
                <h2>{ t('Recover password') }</h2>
                <br/>
                <p>{ t('Recover password instructions') }</p>
                <br/>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        name="username"
                        placeholder={t('Insert your') + ' ' + t('username')}
                        ref={register(validator('username', 3, 25))}
                    />
                    { errors.username && <p>{errors.username.message}</p> }

                    <input type="submit" value={t('Submit')} />
                </form>
                    
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}