import { useEffect, useState } from "react";
import StatusFilter from "./StatusFilter";
import axios from "axios";

const PeopleList = ({setPersonId}) => {
    const [people, setPeople] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const fetchPeople = async () => {
        try {
            // const response = await fetch('/api/people' + (selectedStatus ? '?status=' + encodeURIComponent(selectedStatus) : ''));
            // const data = await response.json();

            const response = await axios.get('/api/people' + (selectedStatus ? '?status=' + encodeURIComponent(selectedStatus) : ''))
            setPeople(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPeople();
    }, [selectedStatus])

    return <>
        <h1>People of interest</h1>
        <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
        <ul className="people-list">
            {
                people.map(person => {
                    return <li key={person.id} className="people-list__person">
                        <div>
                            <img src={"/images/" + person.image.path} alt="person image" />
                            <p>
                                {person.name} {" "}
                                {
                                    person.aliases.length > 0 ? 
                                        <>
                                        (
                                            {person.aliases.map(alias => alias.alias).join(', ')}
                                        )
                                        </>
                                    : ''
                                }    
                            </p>
                        </div>
                        <button onClick={() => {setPersonId(person.id)}}>See details</button>
                    </li>
                })
            }
        </ul>
    </>
}

export default PeopleList;