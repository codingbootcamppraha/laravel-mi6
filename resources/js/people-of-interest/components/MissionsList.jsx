import { useEffect, useState } from "react";
import axios from "axios";

const MissionsList = ({setMissionId}) => {
    const [missions, setMissions] = useState([]);

    const fetchMissions = async () => {
        try {
            const response = await axios.get('/api/missions');

            setMissions(response.data);
        } catch (error) {
            // ...
        }
    }

    const handleDetailsRequest = async (missionId) => {
        try {
            const response = await axios.post('/api/missions/send-details', {
                mission_id: missionId
            });
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchMissions();
    }, [])

    return <>
        <h1>Missions</h1>
        <ul>
            {
                missions.map(mission => {
                    return <li key={mission.id}>
                        <p>
                            {mission.name}
                        </p>
                        <button onClick={() => setMissionId(mission.id)}>
                            See/Edit mission details
                        </button>
                        <button onClick={() => {handleDetailsRequest(mission.id)}}>Send me mission details</button>
                    </li>
                })
            }
        </ul>
    </>

}

export default MissionsList;