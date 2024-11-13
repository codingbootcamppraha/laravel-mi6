import { useState } from "react";
import PersonDetail from "../components/PersonDetail";
import PeopleList from "../components/PeopleList";

const People = () => {
    const [personId, setPersonId] = useState(null);

    return (
        personId ? 
            <PersonDetail personId={personId} setPersonId={setPersonId}/>
        :
            <PeopleList setPersonId={setPersonId}/>
    )
}

export default People;