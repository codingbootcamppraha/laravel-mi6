import LeftMenu from './LeftMenu';
import Main from './Main';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';
import { useEffect, useState } from 'react';

export default function App() {

    const [user, setUser] = useState(null)

    const getUser = async () => {
        const response = await fetch('/api/user');

        if (response.status === 200) {
            const data = await response.json();
            setUser(data)
        } else {
            // user NOT logged-in
            setUser(false);

            // why false?
            // false is different from null and we can use both of these
            // empty values to show different states of the user:
            //    - null - not acquired yet
            //    - false - acquired but not logged in (not found)
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    return (
        <>
            <UserContext.Provider value={{user, setUser, getUser}}>
                <BrowserRouter>
                    <LeftMenu user={ user }/>
                    <Main user={ user }/>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}
