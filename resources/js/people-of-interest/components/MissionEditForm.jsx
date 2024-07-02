import axios from "axios";
import { useEffect, useState } from "react";

const MissionEditForm = ({missionId, setMissionId}) => {
    const [mission, setMission] = useState(null);
    const [values, setValues] = useState({
        name: null,
        year: null,
        outcome: null
    });
    const [message, setMessage] = useState(null);

    const fetchMission = async () => {
        try {
           const response = await axios.get('/api/missions/' + missionId) 

           setMission(response.data);
           setValues({
                name: response.data.name ?? '',
                year: response.data.year ?? '',
                outcome: response.data.outcome ?? ''
           });
        } catch (error) {
             console.log(error)
        }
    }

    useEffect(() => {
        fetchMission();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/missions/store/' + mission.id, values);
            
            fetchMission();
            setMessage(response.data.message)
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.message)
        }
    }

    const handleChange = (event) => {
        setValues(previousValues => {
            return ({...previousValues, 
                [event.target.name]: event.target.value
            });
        });
    }

    return <>
        <button onClick={() => setMissionId(null)}>Go back to missions list</button>
        {
            mission ? 
                <>
                    <h1>Mission - {mission.name} ({mission.year})</h1>

                    <h2>Edit mission:</h2>
                    {
                        message ?
                            <p>{message}</p>
                        : ''
                    }
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" value={values.name} onChange={handleChange}/>

                        <label htmlFor="year">Year:</label>
                        <input type="number" name="year" id="year" value={values.year} onChange={handleChange}/>

                        <label htmlFor="outcome">Outcome successful:</label>
                        {/* <input type="checkbox" name="outcome" id="outcome" checked={values.outcome}/> */}
                        <select name="outcome" id="outcome" value={values.outcome} onChange={handleChange}>
                            <option value=''>Unknown</option>
                            <option value={1}>Successful</option>
                            <option value={0}>Failed</option>
                        </select>

                        <button type="submit">Submit changes</button>
                    </form>
                </>

            : ''
        }
    </>
}

export default MissionEditForm;