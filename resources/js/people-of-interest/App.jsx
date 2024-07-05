import { useEffect, useState } from "react";
import Navigation from "./common/Navigation";
import Home from "./pages/Home";
import People from "./pages/People";
import Missions from "./pages/Missions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import axios from "axios";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ThemeContext from "./context/ThemeContext";

const App = () => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('default');

    // const defineContent = () => {
    //     let contentComponent = null;
    //     switch (content) {
    //         case '':
    //             contentComponent = <Home />
    //             break;
    //         case 'people-of-interest':
    //             contentComponent = <People />
    //             break;
            
    //         case 'missions':
    //             contentComponent = <Missions />
    //             break;
        
    //         default:
    //             break;
    //     }

    //     return contentComponent;
    // }

    const getUser = async () => {
        try {
            const response = await axios('/api/user');
            setUser(response.data);
        } catch (error) {
            setUser(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    return <UserContext.Provider value={{ user, setUser, getUser }}>
        <ThemeContext.Provider value={{theme, setTheme}}>
            <BrowserRouter>
                <Navigation setContent={setContent}/>
                <div className="main">
                    {/* {
                        defineContent()
                    } */}
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        {
                            user ?
                            <>
                                <Route path="/people-of-interest" element={<People />}/>
                                <Route path="/missions" element={<Missions />}/>
                            </>
                            : 
                            <>
                                <Route path="/register" element={<Register />}/>
                                <Route path="/login" element={<Login />}/>
                            </>
                        }
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeContext.Provider>
    </UserContext.Provider>
}

export default App;