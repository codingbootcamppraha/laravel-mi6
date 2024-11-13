import { useEffect, useState } from "react";

const PersonDetail = ({personId, setPersonId}) => {
    const [person, setPerson] = useState(null)

    const fetchPerson = async () => {
        try {
            const response = await fetch(`/api/people/${personId}`);
            const data = await response.json();

            setPerson(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPerson()
    }, [])

    return <div>
        {
            person ? 
            <>
                <button onClick={() => setPersonId(null)}>Go back to people list</button>
                <h1>Details of {person.name} ({person.status.name ?? 'Unknown status'})</h1>

                <div className="person-details">
                    <img src={"/images/"+person.image.path} alt="person image" />
                    <p>Status: {person.status_text ?? 'Unknown'}</p>
                    <p>Born: {person.status.born ?? 'Unknown'}</p>
                    <p>Died: {person.status.died ?? 'Unknown'}</p>
                    <p>Nationality: {person.status.nationality ?? 'Unknown'}</p>
                    <p>Occupation: {person.status.occupation ?? 'Unknown'}</p>
                    <p>Appearance:</p>
                    <ul>
                        <li>Height: {person.height ?? 'Unknown'}</li>
                        <li>Weight: {person.weight ?? 'Unknown'}</li>
                        <li>Hair colour: {person.hair_color ?? 'Unknown'}</li>
                        <li>Eye colour: {person.eye_color ?? 'Unknown'}</li>
                    </ul>
                </div>
            </> 
            : 'No person found'
        }
    </div>
}

export default PersonDetail;