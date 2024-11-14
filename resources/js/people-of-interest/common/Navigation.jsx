import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";

export default function Navigation() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <nav className={"left-menu" + (collapsed ? " left-menu_hidden" : '')}>

            <div className="left-menu__visibility-toggle" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? '>' : '<'}
            </div>

            <div className="left-menu__content">

                <div className="left-menu__header">
                    <img className="left-menu__seal" src="/images/img/mi6-seal.png" alt="MI6 seal" />
                </div>

                <div className="left-menu__links">
                    <Link to="/">Home</Link>
                    <Link to="/people-of-interest">People of interest</Link>
                    <Link to="/missions">Missions</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Logout/>
                </div>
            </div>

        </nav>
    )
}