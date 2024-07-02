import axios from "axios";
import { useEffect, useState } from "react";

const MissionEditForm = ({missionId, setMissionId}) => {
    const [mission, setMission] = useState(null);

    const fetchMission = async () => {
        try {
           const response = await axios.get('/api/missions/' + missionId) 

           setMission(response.data);
        } catch (error) {
            // ....
        }
    }

    useEffect(() => {
        fetchMission();
    }, [])

    const handleSubmit = async () => {

    }

    return <>
        <button onClick={() => setMissionId(null)}>Go back to missions list</button>
        {
            mission ? 
                <>
                    <h1>Mission - {mission.name} ({mission.year})</h1>

                    <h2>Edit mission:</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" value={mission.name}/>

                        <label htmlFor="year">Year:</label>
                        <input type="number" name="year" id="year" value={mission.year}/>

                        <label htmlFor="outcome">Outcome successful:</label>
                        {/* <input type="checkbox" name="outcome" id="outcome" checked={mission.outcome}/> */}
                        <select name="outcome" id="outcome">
                            <option value={null}>Unknown</option>
                            <option value={true}>Successful</option>
                            <option value={false}>Failed</option>
                        </select>

                        <button type="submit">Submit changes</button>
                    </form>
                </>

            : ''
        }
    </>
}

export default MissionEditForm;