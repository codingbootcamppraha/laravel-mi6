import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Navigation from "./common/Navigation";
import People from "./pages/People";
import Missions from "./pages/Missions";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios('/api/user');

            console.log(response.data);
            
            setUser(response.data);
        } catch (error) {
            setUser(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <BrowserRouter>
            <Navigation/>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/people-of-interest" element={<People />}/>
                    <Route path="/missions" element={<Missions />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;