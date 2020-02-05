import React from "react";
import Canvas from '../Canvas/Canvas';
import { useForm } from "react-hook-form";

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export default function Register({ user, setUser, logout }) { 

    const { t } = useTranslation();

    const onEdit = typeof (user) === 'undefined' ? 0 : 1; // 0 'REGISTER' : 1 'EDIT';
    const pageTitle = onEdit ? 'Edit profile' : 'Register user';
    const method = onEdit ? 'PUT' : 'POST';
    
    
    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: user });
    
    const onSubmit = data => {

        changeLanguage(data.language);       
        
        if (onEdit && data.password === '')
            delete data.password;
        
        console.log('data', data);
        
        setUser(data, method);
    };

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    }

    const handleLogout = () => {
        reset();    // does not empty entries !!
        logout();
    }
    
    const logoutButton = onEdit ? <button variant="secondary" className="float-right logoutbutton" onClick={handleLogout}>{t('Logout')}</button> : '';
    const idHidden = onEdit ? <input type="hidden" name="id" defaultValue={user.id} ref={register()} /> : '';
    const passwordTitle = onEdit ? 'Enter new password to change it' : 'Password';
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
            return validator('password', 3, 25)
    }
    
    return (
        <Canvas>
            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
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

                    <label>{ t('Remember me?') }<input name="remember" type="checkbox" ref={register} /></label>

                    { idHidden }

                    <input type="submit" value={t('Submit')} />
                </form>
                    
                { logoutButton }
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}