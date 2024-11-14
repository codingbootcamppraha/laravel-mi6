import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/UserContext";

export default function Logout () {
    const { getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = axios.post('/logout');

            getUser();
            navigate('/');
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}