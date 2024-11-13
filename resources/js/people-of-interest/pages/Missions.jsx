import { useState } from "react";
import MissionsList from "../components/MissionsList";
import MissionEditForm from "../components/MissionEditForm";

const Missions = () => {
    const [missionId, setMissionId] = useState(null);

    return (
        missionId ?
                <MissionEditForm missionId={missionId} setMissionId={setMissionId}/>
            : 
                <MissionsList setMissionId={setMissionId}/>
    )
}

export default Missions;