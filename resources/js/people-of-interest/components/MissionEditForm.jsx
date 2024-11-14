import { useEffect, useState } from "react";
import axios from "axios";

const MissionEditForm = ({missionId, setMissionId}) => {
    const [mission, setMission] = useState(null);
    const [values, setValues] = useState({
        name: null,
        year: null,
        outcome: null
    });

    const [message, setMessage] = useState(null);
    const [people, setPeople] = useState([]);
    const [personId, setPersonId] = useState(null);

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

    const fetchPeople = async () => {
        try {
            const response = await axios.get('/api/people')
            setPeople(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMission();
        fetchPeople()
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

    const handleAssignmentOfPeople = async (e) => {
        e.preventDefault();
        console.log(personId)
        try {
            const response = await axios.post('/api/missions/assign-person', {
                person_id: personId,
                mission_id: mission.id
            });

            setMessage(response.data.message)
            fetchMission();
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    const handleUnassignmentOfPeople = async (personId) => {
        try {
            const response = await axios.post('/api/missions/unassign-person', {
                person_id: personId,
                mission_id: mission.id
            });

            setMessage(response.data.message)
            fetchMission();
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    return (
        <>
            <button onClick={() => setMissionId(null)}>Go back to missions list</button>
            {
                mission ? 
                    <>
                        <h1>Mission - {mission.name} ({mission.year})</h1>

                        {
                            message ?
                                <p>{message}</p>
                            : ''
                        }
                        <h2>People assigned to the mission:</h2>
                        {
                            mission.people.length > 0 ?
                                <ul>
                                    {
                                        mission.people.map(person => {
                                            return <li>{person.name} <button onClick={() => handleUnassignmentOfPeople(person.id)}>x</button></li>
                                        })
                                    }
                                </ul>
                            : 'No people assigned to the mission'
                        }

                        <h2>Edit mission:</h2>
                        
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


                        <h2>Assign people to mission:</h2>
                        <form onSubmit={handleAssignmentOfPeople}>
                            <select name="people" id="people" onChange={(e) => {
                                    setPersonId(e.target.value)
                                }}>
                                <option value={null}>Select a person</option>
                                {
                                    people.map(person => {
                                        return <option key={person.id} value={person.id}>{person.name}</option>
                                    })
                                }
                            </select>
                            <button type="submit">Assign person</button>
                        </form>
                    </>

                : ''
            }
        </>
    );
}

export default MissionEditForm;