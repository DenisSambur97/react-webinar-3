import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import useSelector from "../../store/use-selector";

const Pagination = ({onPageChange, totalPages}) => {
    const pageNumberCurrent = useSelector((state) => state.catalog.currentPage);
    const delta = 1;
    const firstPage = Math.max(1, pageNumberCurrent - delta);
    const lastPage = Math.min(totalPages, pageNumberCurrent + delta);

    let pageNumbers;
    if (pageNumberCurrent === 1) {
        pageNumbers = Array.from({ length: 3 }, (_, i) => i + 1);
    } else {
        pageNumbers = Array.from(
            { length: lastPage - firstPage + 1 },
            (_, i) => firstPage + i
        );
    }

    return (
        <div className="Pagination">
            {firstPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {firstPage > 2 && <span>...</span>}
                </>
            )}
            {pageNumbers.map((pageNumber) => (
                <button
                    className="Pagination__current"
                    key={pageNumber}
                    disabled={pageNumberCurrent === pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            {lastPage < totalPages && (
                <>
                    {lastPage < totalPages - 1 && <span>...</span>}
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default memo(Pagination);
