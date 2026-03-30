import { PaginationState, SortOption } from '../types/pagination';
import './Pagination.css';


interface PaginationProps { 
    paginationState :PaginationState ,
    handlePaginationChange : (key : string , value: string | number) => void, 
    sortOptions : SortOption[]
}

const PaginationControls = ({
   paginationState, handlePaginationChange , sortOptions
} : PaginationProps) => {
    return (
        <div className="pagination-controls">
            <div className="pagination-navigation">
            <button
                    onClick={() => handlePaginationChange('page',0)}
                >
                    <i className="fa-solid fa-backward-step fa-xl"></i>
                </button>
                <button
                    onClick={() => handlePaginationChange('page',paginationState.page - 1)}
                    disabled={paginationState.page === 0}
                >
                    <i className="fa-solid fa-backward fa-lg"></i>
                </button>
                <span>Page {paginationState.page + 1} / {paginationState.totalPages}</span>
                <button
                    onClick={() => handlePaginationChange('page',paginationState.page + 1)}
                    disabled={paginationState.page === paginationState.totalPages - 1}
                >
                    <i className="fa-solid fa-forward fa-lg"></i>
                </button>
                <button
                    onClick={() => handlePaginationChange('page',paginationState.totalPages -1)}
                >
                    <i className="fa-solid fa-forward-step fa-xl"></i>
                </button>
            </div>

            <div className="pagination-options">
                <div className="option-group">
                    <label>Page Size:</label>
                    <select value={paginationState.size} onChange={(e) => handlePaginationChange('size',e.target.value)}>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                    </select>
                </div>

                <div className="option-group">
                    <label>Sort By:</label>
                    <select value={paginationState.by} onChange={(e) => handlePaginationChange('by',e.target.value)}>
                   { sortOptions?.map((item ,index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                    </select>
                </div>

                <div className="option-group">
                    <label>Sort Order:</label>
                    <select value={paginationState.order} onChange={(e) => handlePaginationChange('order',e.target.value)}>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;
