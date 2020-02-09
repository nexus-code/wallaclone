import React from "react";
import Canvas from '../Canvas/Canvas';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';

import { useTranslation } from 'react-i18next';

/**
 * 
 * Reset user password
 */

export default function RecoverPasswd({ resetPasswd }) { 

    const { t } = useTranslation();
    const { key } = useParams();
    
    const { register, handleSubmit, getValues, errors } = useForm({});
    
    const onSubmit = data => {

        
        resetPasswd(data.password, data.recoverKey);
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
                        // type="password"
                        name="password" 
                        placeholder={t('Insert your') + ' ' + t('new password')  }
                        ref={register(validator('password', 3, 25))}  
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <label>{t('Confirm password') }</label>
                    <input
                        // type="password"
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

                    <input type="hidden" name="recoverKey" defaultValue={ key } ref={register()} />

                    <input type="submit" value={t('Submit')} />

                </form>
                    
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}