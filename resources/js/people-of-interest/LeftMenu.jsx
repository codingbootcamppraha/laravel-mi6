import { useState } from "react"
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function LeftMenu({ user }) {

    const [hidden, setHidden] = useState(false);

    return (
        <nav className={ `left-menu${hidden ? ' left-menu_hidden' : ''}` }>
            <div
                className="left-menu__visibility-toggle"
                onClick={ () => setHidden(!hidden) }
            >
                { hidden ? '>' : '<' }
            </div>

            <div className="left-menu__content">

                <div className="left-menu__header">
                    <img className="left-menu__seal" src="/img/mi6-seal.png" alt="MI6 seal" />
                </div>

                <div className="left-menu__links">
                    <Link to="/">Home</Link>
                    <Link to="/people-of-interest">People of interest</Link>
                    <Link to="/missions">Missions</Link>

                    {
                        user === false
                            ? (
                                <>
                                    <Link to="/register">Register</Link>
                                    <Link to="/login">Login</Link>
                                </>
                            )
                            : ''
                    }

                    {
                        user
                            ? <Logout />
                            : ''
                    }

                </div>

            </div>

        </nav>
    )
}
