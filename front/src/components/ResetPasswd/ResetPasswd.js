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
    
    const { register, handleSubmit, reset, getValues, errors } = useForm({});

    
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{ t('New password') }</label>
                    <input
                        type="password"
                        name="newPasswd" 
                        placeholder={t('Insert your') + ' ' + t('new password')  }
                        ref={register(validator('newPasswd', 3, 25))}  
                    />
                    {errors.newPasswd && <p>{errors.newPasswd.message}</p>}
                    <label>{t('Confirm password') }</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        placeholder={t('Type your new password again')}
                        ref={register({
                            required: t('Please confirm password!'),
                            validate: {
                                matchesPreviousPassword: value => {
                                    const { password } = getValues();
                                    return password === value || t('Passwords should match!');
                                }
                            }
                        })}
                    />
                    {errors.passwordConfirmation && (
                        <p>
                            {errors.passwordConfirmation.message}
                        </p>
                    )}

                    <input type="submit" value={t('Submit')} />
                </form>
                    
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}