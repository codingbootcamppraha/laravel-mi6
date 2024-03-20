import { Routes, Route } from 'react-router-dom';

import People from "./People"
import Register from "./Register";
import Login from "./Login";
import Missions from "./Missions";
import MissionEditForm from "./MissionEditForm";

export default function Main({ user }) {
    
    return (
        <main className="main">
            <div className="main__content">
                <Routes>
                    <Route path="/" element={
                        user
                        ? <h1>Welcome back, { user.name }</h1>
                        : <h1>Welcome to MI6</h1>
                    } />

                    <Route path="/register" element={ <Register /> } />
                    <Route path="/login" element={ <Login /> } />

                    <Route path="/people-of-interest" element={ <People /> } />
                    <Route path="/missions" element={ <Missions /> } />
                    <Route path="/missions/:id/edit" element={ <MissionEditForm /> } />

                </Routes>
            </div>

        </main>
    )
}
