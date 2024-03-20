import {useEffect, useState} from "react"
import PeopleList from "./PeopleList";
import PersonDetail from "./PersonDetail";
import StatusFilter from "./StatusFilter.jsx";
import Pagination from "./Pagination";

export default function People() {
    const [personId, setPersonId] = useState(null);
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [lastPageNr, setLastPageNr] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const loadData = async () => {
        setLoading(true);

        if (personId) {
            let url = `/api/people/${personId}`;
            const response = await fetch(url);
            const data = await response.json();
            setPerson(data.person);
        } else {
            let url = `/api/people?page=${page}`;

            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (selectedStatus !== '') {
                url += '&status=' + encodeURIComponent(selectedStatus);
            }

            console.log(url)

            const response = await fetch(url);
            const data = await response.json();

            setPeople(data.people);
            setTotal(data.total);
            setLastPageNr(data.last_page);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [personId, selectedStatus, page, search]);

    useEffect(() => {
        setPage(1);
    }, [search])

    return (
        <div className="people-of-interest">

            <h1>People of interest</h1>

            <div className="people-of-interest__search">
                <label htmlFor="">Search by name:</label>
                <input
                    type="text"
                    value={ search }
                    onChange={ (event) => setSearch(event.target.value) }
                />
            </div>

            {
                loading
                    ? <div className="loading">Loading...</div>
                    : (
                        personId && person ?
                            <PersonDetail setPersonId={setPersonId} person={person} setPerson={setPerson}/> :

                            <>
                                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>.

                                <div className="people-of-interest__status">
                                    <div className="people-of-interest__total">
                                        Results found: { total }
                                    </div>

                                    <Pagination
                                        page={ page }
                                        lastPage={ lastPageNr }
                                        setPage={ setPage }
                                    />
                                </div>
                                
                                <div className="people-of-interest__list">
                                    <PeopleList people={people} setPersonId={setPersonId}/>
                                </div>
                            
                            </>
                    )
            }

        </div>
    )

}
