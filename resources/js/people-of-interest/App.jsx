import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navigation from "./common/Navigation";
import People from "./pages/People";
import Missions from "./pages/Missions";

const App = () => {

    return (
        <BrowserRouter>
            <Navigation/>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/people-of-interest" element={<People />}/>
                    <Route path="/missions" element={<Missions />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;