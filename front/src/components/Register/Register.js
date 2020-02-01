import React, { useReducer } from "react";

import Canvas from '../Canvas/Canvas';

import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

/**
 *  session user handler
 */

export default function Register({ user, setUser, logout }) { 

    // uses toast to ui add notifications   
    const notifyWarning = (warning) => toast.warning(warning);
    ///

    const status = typeof (user) === 'undefined' ? 0 : 1; // 0 'REGISTER' : 1 'EDIT';
    const pageTitle = status ? 'Edit profile' : 'Register user';


    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: status ? user.name : '',
            surname: status ? user.surname : '',
        }
    );

    const handleLogout = () => {
        setUserInput({name: '', surname: ''});
        logout();
    }
    const logoutButton = status ? <Button variant="secondary" className="float-right logoutButton" onClick={handleLogout}>Logout</Button> : '';
    

    const handleChange = event => {

        const name = event.target.name;
        const newValue = event.target.value;
        setUserInput({ [name]: newValue });
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (userInput.name.trim().length <= 3) {
            notifyWarning('The name must be bigger than 3 characters');
            return;
        }

        if (userInput.surname.trim().length <= 3) {
            notifyWarning('The surrname must be bigger than 3 characters');
            return;
        }

        setUser({ name: userInput.name, surname: userInput.surname});
    }
        
    return (
        <Canvas>
            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>{ pageTitle }</h2>
                <Form onSubmit = { handleSubmit }>
                    <Form.Group controlId="formGroupname" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Enter name" value={ userInput.name } onChange={ handleChange } />
                    </Form.Group>
                    <Form.Group controlId="formGroupsurname" >
                        <Form.Label>Surname</Form.Label>
                        <Form.Control name="surname" placeholder="Enter surname" value={ userInput.surname } onChange={ handleChange } />
                    </Form.Group>


                    <Button variant="primary" className="submitButton" type="submit">
                        Save
                    </Button>
                    
                    { logoutButton }

                </Form>
            </div>
        </Canvas>
    );
}