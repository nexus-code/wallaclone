import React from "react";
import Canvas from '../Canvas/Canvas';
import { useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';

export default function Login() { 

    const { t } = useTranslation();

    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => {

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
            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>{t('Login')}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{ t('Username') }</label>
                    <input 
                        name="username" 
                        placeholder={t('Insert your') + ' ' + t('username')  }
                        ref={register(validator('username', 3, 25))}  
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                    <label>{t('Password') }</label>
                    <input
                        type="password"
                        name="password"
                        placeholder={t('Insert password')}
                        ref={register(validator('password', 3, 25))}
                    />
                    {errors.password && <p>{errors.password.message}</p>}


                    <input type="submit" value={t('Submit')} />
                </form>
                    
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}