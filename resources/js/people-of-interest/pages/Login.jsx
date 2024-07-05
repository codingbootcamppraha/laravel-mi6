import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
 
export default function Login(props) {
    const { getUser } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
 
    const handleSubmit = async (event) => {
        event.preventDefault();
 
        // with axios
        try {
            // make the AJAX request
            const response = await axios.post('/login', values);
            // get the (already JSON-parsed) response data
            const response_data = response.data;

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
        <form action="/login" method="post" onSubmit={ handleSubmit } className={theme}>
            {console.log(theme)}
 
            <input type="email" name="email" value={ values.email } onChange={ handleChange } />
 
            <input type="password" name="password" value={ values.password } onChange={ handleChange } />
 
            <button>Login</button>
 
        </form>
    );
}
