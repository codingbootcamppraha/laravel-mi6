import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Navigation = ({setContent}) => {
    const [collapsed, setCollapsed] = useState(false);

    const { user } = useContext(UserContext);

    return <nav className={"left-menu" + (collapsed ? " left-menu_hidden" : '')}>

        <div className="left-menu__visibility-toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '>' : '<'}
        </div>

        <div className="left-menu__content">

            <div className="left-menu__header">
                <img className="left-menu__seal" src="/images/mi6-seal.png" alt="MI6 seal" />
            </div>

            <div className="left-menu__links">
                {/* <a onClick={(e) => {
                    e.preventDefault()
                    setContent('')
                }}>Home</a>
                <a onClick={(e) => {
                    e.preventDefault()
                    setContent('people-of-interest')
                }}>People of interest</a>
                <a onClick={(e) => {
                    e.preventDefault()
                    setContent('missions')
                }}>Missions</a> */}
                <Link to="/">Home</Link>
                {
                    user ?
                        <>
                            <Link to="/people-of-interest">People of interest</Link>
                            <Link to="/missions">Missions</Link>
                            {/* Link to logout */}
                        </>
                    : 
                    <>
                        <Link to="/register">Register</Link>
                        {/* Link to login */}
                    </>
                        

                }
            </div>
        </div>
    </nav>
}

export default Navigation;