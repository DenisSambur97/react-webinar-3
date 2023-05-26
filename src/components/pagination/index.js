import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

const Pagination = ({currentPage, onPageChange, totalPages, onCurrChange}) => {
    let delta;
    {currentPage === 1 || currentPage === totalPages ? delta = 2 : delta = 1}
    // Номер первой страницы
    const firstPage = Math.max(1, currentPage - delta);
    // Номер последней страницы
    const lastPage = Math.min(totalPages, currentPage + delta);
    // Массив номеров страниц для отображения
    const pageNumbers = Array.from({length: lastPage - firstPage + 1}, (_, i) => firstPage + i);
    let curr
    {pageNumbers[1] !== 1 && pageNumbers[1] !== totalPages ? curr = pageNumbers[1] : curr = currentPage }


    return (
        <div className='Pagination'>
            {firstPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {firstPage > 2 && <span>...</span>}
                </>
            )}
            {pageNumbers.map(pageNumber =>
                <button
                    className="Pagination__current"
                    key={pageNumber}
                    disabled={currentPage === pageNumber}
                    onClick={() => {
                        onPageChange(pageNumber)
                    }}
                >
                    {pageNumber}
                </button>
            )}
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
