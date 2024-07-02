import { useState } from "react";
import Navigation from "./common/Navigation";
import Home from "./pages/Home";
import People from "./pages/People";

const App = () => {
    const [content, setContent] = useState('');

    const defineContent = () => {
        let contentComponent = null;
        switch (content) {
            case '':
                contentComponent = <Home />
                break;
            case 'people-of-interest':
                contentComponent = <People />
                break;
        
            default:
                break;
        }

        return contentComponent;
    }



    return <>
        <Navigation setContent={setContent}/>
        <div className="main">
            {
                defineContent()
            }
        </div>
    </>
}

export default App;