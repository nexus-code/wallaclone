import React from "react";
import Canvas from '../Canvas/Canvas';
import { useForm } from "react-hook-form";

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';

/**
 * 
 * Registers user on API and edit her profile
 */

export default function Register({ user, setUser, logout, unsuscribe }) { 

    const { t } = useTranslation();
    
    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: user });

    const onEdit = typeof (user) === 'undefined' ? false : true;
    const pageTitle = onEdit ? 'Edit profile' : 'Register user';
    const method = onEdit ? 'PUT' : 'POST';
        
    
    const onSubmit = data => {

        changeLanguage(data.language);       
        
        if (onEdit && data.password === '')
            delete data.password;
        
        setUser(data, method);
    };

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    }

    const handleLogout = () => {
        reset();    // does not empty entries !!
        logout();
    }
    
    const passwordTitle = onEdit ? 'Enter password ONLY to change it' : 'Password';
    const passwordPlaceholder = onEdit ? 'New password' : 'Insert your password';
    
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
    
    const validatorPassword = (field, minLength, maxLength) => {

        if (onEdit)
            return {
                minLength: {
                    value: minLength,
                    message: `Min length is ${minLength}`
                },
                maxLength: {
                    value: maxLength,
                    message: `Max length is ${maxLength}`
                }
            }
        else
            return validator(field, minLength, maxLength)
    }

    /**
     * Unsuscribe
     */
    const confirm = useConfirm();
    const handleUnsubscribe = () => {
        confirm({ title: 'Confirm to unsuscribe', description: 'This action is permanent! All your adverts and your profile will be removed' })
            .then(() => { unsuscribe(user) });
    };

    return (
        <Canvas>
            <div className="formContainer">
                <h2>{ t(pageTitle) }</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{ t('Username') }</label>
                    <input 
                        name="username" 
                        placeholder={t('Insert your') + ' ' + t('username')  }
                        ref={register(validator('username', 3, 25))}  
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                    <label>{t(passwordTitle) }</label>
                    <input
                        type="password"
                        name="password"
                        placeholder={t(passwordPlaceholder)}
                        ref={register(validatorPassword('password', 3, 25))}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <label>{ t('Email') }</label>
                    <input
                        type="text"
                        name="email"
                        ref={register({
                            required: t("Email required"),
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: t("Invalid email address")
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <label>{ t('Language') }</label>
                    <select ref={register} name="language">
                        <option value="en">{t('English')}</option>
                        <option value="es-ES">{t('Spanish')}</option>
                    </select>

                    {/* <label>{ t('Remember me?') }<input name="remember" type="checkbox" ref={register} /></label> */}

                    { onEdit && <input type="hidden" name="id" defaultValue={user.id} ref={register()} /> }

                    <input type="submit" value={t('Submit')} />
                </form>
                    
                {onEdit && <Button className="float-right logoutbutton" onClick={handleLogout}>{t('Logout')}</Button> }
                
                <br />
                <hr />
                <br />

                { onEdit && <Button onClick={handleUnsubscribe}>{t('Unsubscribe')}</Button> }

                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}