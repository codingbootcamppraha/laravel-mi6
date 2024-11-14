import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
export default function Login() {
 
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
 
    const handleSubmit = async (event) => {
        event.preventDefault();
 
        // make the AJAX request
        // with axios
        try {
            // make the AJAX request
            const response = await axios.post('/login', values);
            // get the (already JSON-parsed) response data
            const response_data = response.data;

            console.log(response_data);
            
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
        <form action="/login" method="post" onSubmit={ handleSubmit }>
 
            <input type="email" name="email" value={ values.email } onChange={ handleChange } />
 
            <input type="password" name="password" value={ values.password } onChange={ handleChange } />
 
            <button>Login</button>
 
        </form>
    );
}