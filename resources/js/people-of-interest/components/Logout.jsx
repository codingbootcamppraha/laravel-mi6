import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('/logout');

            getUser();
            navigate('/');
        } catch (error) {
            
        }
    }

    return <button onClick={handleLogout}>
        Logout
    </button>
}

export default Logout;