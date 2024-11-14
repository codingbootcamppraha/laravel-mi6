import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../context/UserContext';

export default function Register() {
    const { getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    })
 
    const handleSubmit = async (event) => {
 
        event.preventDefault();
 
        // make the AJAX request
        // with axios
        try {
            // make the AJAX request
            const response = await axios.post('/register', values);
            // get the (already JSON-parsed) response data
            const response_data = response.data;

            console.log(response_data);
            
            getUser();
            navigate('/');
        } catch (error) {
            // if the response code is not 2xx (success)
            switch (error.response.status) {
                case 422:
                    // handle validation errors here
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    break;
                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }
    }
 
    const handleChange = (event) => {
        setValues(previous_values => {
            return ({...previous_values,
                [event.target.name]: event.target.value
            });
        });
    }
 
    return (
        <form action="/register" method="post" onSubmit={ handleSubmit }>
 
            <input type="text" name="name" value={ values.name } onChange={ handleChange } />
 
            <input type="email" name="email" value={ values.email } onChange={ handleChange } />
 
            <input type="password" name="password" value={ values.password } onChange={ handleChange } />
 
            <input type="password" name="password_confirmation" value={ values.password_confirmation } onChange={ handleChange } />
 
            <button>Register</button>
 
        </form>
    );
}