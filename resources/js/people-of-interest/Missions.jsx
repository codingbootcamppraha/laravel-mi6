import { useEffect, useState } from "react";
import axios from 'axios';
import MissionEditForm from "./MissionEditForm";
import { Link } from "react-router-dom";

export default function Missions() {
    const [missions, setMissions] = useState([]);
    const [missionId, setMissionId] = useState(null);

    const loadMissions = async () => {
        try {
            let response = await axios.get('/api/missions');
            setMissions(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadMissions();
    }, [])

    const sendEmail = async (missionId) => {
        try {
            let response = await axios.get(`/api/missions/get-details/${missionId}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="missions-container">
            {
                missionId ?
                    <MissionEditForm missionId={missionId} setMissionId={setMissionId} />
                :
                    missions.map(mission => {
                        return  <div
                                    key={ mission.id }
                                    className="missions-container__mission"
                                >
                                    <p>Name: {mission.name}</p>
                                    <p>Year: {mission.year}</p>
                                    <p>Outcome: {mission.outcome !== null ? (mission.outcome == 1 ? 'Success' : 'Failure') : 'Unknown'}</p>
                                    <Link to={ `/missions/${mission.id}/edit` }>EDIT</Link>
                                    <button onClick={() => sendEmail(mission.id)}>Send to my mail</button>
                                    <hr/>
                                </div>
                    })
            }
        </div>
    );
}