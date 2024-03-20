import './StatusFilter.scss';
import React, { useState, useEffect } from "react";

const StatusFilter = ({ selectedStatus, setSelectedStatus }) => {
    const [statuses, setStatuses] = useState([]);

    const loadStatuses = async () => {
        try {
            const response = await fetch("/api/statuses", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const statusesData = await response.json();
            setStatuses(statusesData);
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    const handleStatusClick = (status) => {
        setSelectedStatus(status.id);
    };

    return (
        <div className="status-filter__status">
            {statuses.map((status, index) => (
                <a href="#"
                    key={index}
                    onClick={() => handleStatusClick(status)}
                   className={`status-button ${selectedStatus === status.id ? "selected" : ""}`}
                >
                    {status.name}
                </a>
            ))}
        </div>
    );
};

export default StatusFilter;
