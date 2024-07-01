import { useEffect, useState } from "react";

const PeopleList = ({setPersonId}) => {
    const [people, setPeople] = useState([]);

    const fetchPeople = async () => {
        try {
            const response = await fetch('/api/people');
            const data = await response.json();

            setPeople(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPeople();
    }, [])

    return <>
        <h1>People of interest</h1>
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