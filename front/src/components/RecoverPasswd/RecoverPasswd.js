import React from "react";
import Canvas from '../Canvas/Canvas';
import { useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';

/**
 * 
 * Recover user password
 */

export default function RecoverPasswd({ recoverPasswd }) { 

    const { t } = useTranslation();
    
    const { register, handleSubmit, reset, errors } = useForm({});
    
    const onSubmit = data => {

        recoverPasswd(data.email);
    };

    
    return (
        <Canvas>
            <div className="formContainer">
                <h2>{ t('Recover password') }</h2>
                <br/>
                <p>{ t('Recover password instructions') }</p>
                <br/>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        ref={register({
                            required: t("Email required"),
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: t("Invalid email address")
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}


                    <input type="submit" value={t('Submit')} />
                </form>
                    
                <br />
                <hr />
                <br />

            </div>
        </Canvas>
    );
}