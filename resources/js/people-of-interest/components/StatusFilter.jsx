import { useEffect, useState } from "react";

const StatusFilter = ({selectedStatus, setSelectedStatus}) => {
    const [statuses, setStatuses] = useState([]);

    const fetchStatuses = async () => {
        try {
            const response = await fetch('/api/statuses');
            const data = await response.json();
            console.log(data)
            setStatuses(data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchStatuses();
    }, [])

    return <div className="status-filter">
        {
            statuses.map(status => {
                return <button className={"status-filter__button" + (selectedStatus == status.id ? ' status-filter__button_selected' : '')} key={status.id} onClick={() => setSelectedStatus(status.id)} >{status.name}</button>
            })
        }
    </div>
}

export default StatusFilter;