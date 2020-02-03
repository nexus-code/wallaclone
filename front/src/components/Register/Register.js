import React from "react";

import Canvas from '../Canvas/Canvas';

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

export default function Register({ user, setUser, logout }) { 

    // uses toast to ui add notifications   
    const notifyWarning = (warning) => toast.warning(warning);
    ///

    const status = typeof (user) === 'undefined' ? 0 : 1; // 0 'REGISTER' : 1 'EDIT';
    const pageTitle = status ? 'Edit profile' : 'Register user';



    const { register, handleSubmit, reset, errors } = useForm({ defaultValues: user });
    const onSubmit = data => {
        setUser(data);
    };

    const handleLogout = () => {
        // setUserInput({name: '', password: ''});
        reset();
        logout();
    }
    const logoutButton = status ? <Button variant="secondary" className="float-right logoutButton" onClick={handleLogout}>Logout</Button> : '';
    
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
                <h2>{ pageTitle }</h2>
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

                    <label>Remember me?<input name="remember" type="checkbox" ref={register} /></label>
                    
                    <input type="submit" />
                </form>
                    
                { logoutButton }
            </div>
        </Canvas>
    );
}