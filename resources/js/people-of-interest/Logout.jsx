import { useContext } from "react"
import UserContext from "./UserContext"

export default function Logout() {

    const { setUser, getUser } = useContext(UserContext);

    const logout = async () => {

        const response = fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })

        if (response.status === 204) {
            // setUser(false);
            getUser();
        }
    }

    return (
        <button
            onClick={ logout }
        >
            Logout
        </button>
    )
}