import React from "react";

import Canvas from '../Canvas/Canvas';

import { useForm } from "react-hook-form";

import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export default function Register({ user, setUser, logout }) { 

    const { t } = useTranslation();

    const status = typeof (user) === 'undefined' ? 0 : 1; // 0 'REGISTER' : 1 'EDIT';
    const pageTitle = status ? 'Edit profile' : 'Register user';


    // console.log(user);

    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: user });
    const onSubmit = data => {

        changeLanguage(data.language)

        setUser(data);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const handleLogout = () => {
        
        reset();
        logout();
    }
    const logoutButton = status ? <button variant="secondary" className="float-right logoutbutton" onClick={handleLogout}>Logout</button> : '';
    
    function validator (field, minLength, maxLength) {
        return {
            required: `${field} is required`,
            minLength: {
                value: minLength,
                message: `Min length is ${minLength}`
            },
            maxLength: {
                value: maxLength,
                message: `Max length is ${maxLength}`
            }
        }
    };
      
    return (
        <Canvas>
            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>{ t(pageTitle) }</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Username</label>
                    <input 
                        name="username" 
                        placeholder="Insert your unique username" 
                        ref={register(validator('username', 3, 25))}  
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Insert your password"
                        ref={register(validator('password', 3, 25))}  
                    />
                    {errors.password && <p>Password is required</p>}
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        ref={register({
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <label>{t('Language')}</label>
                    <select ref={register} name="language">
                        <option value="en">English</option>
                        <option value="es">Castellano</option>
                    </select>

                    <label>Remember me?<input name="remember" type="checkbox" ref={register} /></label>
                    
                    <input type="submit" />
                </form>
                    
                { logoutButton }
                <br />
                <hr />
                <br />
                {/* <button onClick={() => changeLanguage('es')}>es</button>
                <button onClick={() => changeLanguage('en')}>en</button> */}

            </div>
        </Canvas>
    );
}