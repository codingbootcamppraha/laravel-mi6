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
                    </li>
                })
            }
        </ul>
    </>

}

export default MissionsList;