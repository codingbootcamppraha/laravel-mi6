import Navigation from "./common/Navigation";
import Home from "./pages/Home";
import People from "./pages/People";

const App = () => {
    return <>
        <Navigation />
        {/* <Home /> */}
        <div className="main">
            <People />
        </div>
    </>
}

export default App;