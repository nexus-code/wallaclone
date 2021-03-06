import React from "react";
import Canvas from '../Canvas/Canvas';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

export default function Login({ login }) { 

    const { t } = useTranslation();

    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => {

        login(data);
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
                <h2>{t('Login')}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{ t('Username') }</label>
                    <input 
                        name="username" 
                        placeholder={t('Insert your') + ' ' + t('username')  }
                        ref={register(validator('username', 7, 25))}  
                    />
                    {errors.username && <p>{ t(errors.username.message)}</p>}
                    <label>{t('Password') }</label>
                    <input
                        type="password"
                        name="password"
                        placeholder={t('Insert password')}
                        ref={register(validator('password', 7, 25))}
                    />
                    {errors.password && <p>{t(errors.password.message)}</p>}

                    <input type="submit" value={t('Submit')} />
                    <br />
                    <Link to='/recoverpasswd' className='right'>{t('Recover password')}</Link>
                </form>
                    
                <br />
                <hr />
                <Link to='/register' className="register">{t('Create a new account')}</Link>
                <br />

            </div>
        </Canvas>
    );
}