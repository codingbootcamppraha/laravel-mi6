import { useEffect, useState } from "react"
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function MissionEditForm({missionId, setMissionId}) {
    const [mission, setMission] = useState(null);
    const [people, setPeople] = useState([]);
    const [personId, setPersonId] = useState(null);

    const [message, setMessage] = useState(null);

    // get all dynamic parts of the URL
    const { id } = useParams();

    const loadMission = async () => {
        try {
            let response = await axios.get(`/api/missions/${id}`);
            setMission(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const loadPeople = async () => {
        try {
            const response = await axios.get('/api/people')
            console.log(response.data.people); 
            setPeople(response.data.people)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        loadMission()
        loadPeople()
    }, [])

    const handleChange = (e) => {
        setMission(previous_values => {
            return ({...previous_values,
                [e.target.name]: e.target.value
            });
        });
    }

    const handleCheckbox = (e) => {
        setMission(previous_values => {
            return ({...previous_values,
                [e.target.name]: e.target.checked
            });
        });
    }

    const handleAssignmentOfPeople = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/missions/assign-person', {
                'personId': personId,
                'missionId': mission.id
            });
            console.log(response.data)

            loadMission()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnassignmentOfPerson = async (event) => {
        event.preventDefault();
      
        try {
            const response = await axios.post('/api/missions/unassign-person', {
                'personId': event.target.dataset.personId,
                'missionId': mission.id
            });
            console.log(response.data)

            loadMission()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post('/api/missions/store', mission)
            setMessage(response.data['message'])
        } catch (error) {
            console.log(error)
        }
    }


    return mission ? 
        <div>
            <div>
                <Link to="/missions">
                    <button>&times;</button>
                </Link>
                <h1>Edit Mission #{mission.id}</h1>
                {
                    message ?? ''
                }
                <form action='' method='post' onSubmit={handleSubmit}>
                    <input name='name' type='text' value={mission.name} onChange={handleChange}/>
                    <input name='year' type='number' value={mission.year} onChange={handleChange}/>
                    <input type="checkbox" name="outcome" checked={ mission.outcome ? true : false} onChange={handleCheckbox}/>
                    <button>SAVE</button>
                </form>
            </div>

            <div>
                <h2>Manage people:</h2>

                <div>
                    <h3>People assigned:</h3>
                    <ul>
                        {
                            mission && mission.people.length > 0 ? 
                                mission.people.map(person => {
                                    return <li key={person.id}>
                                            {person.name}
                                            <button onClick={handleUnassignmentOfPerson} data-person-id={person.id}>&times;</button>
                                        </li>
                                })
                            : '----'
                        }
                    </ul>
                </div>

                <div>
                    <h3>Assign new:</h3>
                    {
                        people ?
                        <form onSubmit={handleAssignmentOfPeople}>
                            <select name="people" id="people" onChange={(e) => {setPersonId(e.target.value)}}>
                                <option value={null}>Select a person</option>
                                {
                                    people.map(person => {
                                        return <option key={person.id} value={person.id}>{person.name}</option>
                                    })
                                }
                            </select>

                            <button type="submit">Assign</button>
                        </form> : 'loading'
                    }
                </div>
            </div>
        </div> : 'loading...'
}