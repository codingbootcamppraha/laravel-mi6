import { useState } from "react";
import Navigation from "./common/Navigation";
import Home from "./pages/Home";
import People from "./pages/People";
import Missions from "./pages/Missions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    const [content, setContent] = useState('');

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

    return <>
    <BrowserRouter>
        <Navigation setContent={setContent}/>
        <div className="main">
            {/* {
                defineContent()
            } */}
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/people-of-interest" element={<People />}/>
                <Route path="/missions" element={<Missions />}/>
            </Routes>
        </div>
    </BrowserRouter>
    </>
}

export default App;