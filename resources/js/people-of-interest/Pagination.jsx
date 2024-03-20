import './Pagination.scss';

export default function Pagination({ page, lastPage, setPage: parentSetPage }) {

    const setPage = (nr) => {
        nr = Math.max(1, Math.min(lastPage, nr));

        parentSetPage(nr);
    }

    return (
        <div className="pagination">
            <div
                className={ `pagination__button pagination__first ${page <= 1 ? 'pagination__button--inactive' : ''}` }
                onClick={ () => setPage(1) }
            >
                &lt;&lt;
            </div>
            <div
                className={ `pagination__button pagination__previous ${page <= 1 ? 'pagination__button--inactive' : ''}` }
                onClick={ () => setPage(page - 1) }
            >
                &lt;
            </div>
            <div
                className={ `pagination__page` }>
                { page } / { lastPage }
            </div>
            <div
                className={ `pagination__button pagination__button--next ${page >= lastPage ? 'pagination__button--inactive' : ''}` }
                onClick={ () => setPage(page + 1) }
            >
                &gt;
            </div>
            <div
                className={ `pagination__button pagination__button--last ${page >= lastPage ? 'pagination__button--inactive' : ''}` }
                onClick={ () => setPage(lastPage) }
            >
                &gt;&gt;
            </div>
        </div>
    )
}