import { useEffect, useState } from "react";
import PersonDetail from "../components/PersonDetail";
import PeopleList from "../components/PeopleList";
import StatusFilter from "../components/StatusFilter";

const People = () => {
    const [personId, setPersonId] = useState(null);

    return <>
        {
            personId ? 
                <PersonDetail personId={personId} setPersonId={setPersonId}/>
            :
            <>
                <PeopleList setPersonId={setPersonId}/>
            </>
        }
    </>
}

export default People;