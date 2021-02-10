import React, {useState} from 'react';

const Pagination = ({allItemsValue, pages, step, itemsCountValue, setItemsCountValue}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pagesArr = [];
    for (let i = 1; i <= pages; i++) pagesArr.push(i);

    const prevBtnClick = () => {
        setItemsCountValue(itemsCountValue - step)
        setCurrentPage(currentPage - 1)
    }

    const nextBtnClick = () => {
        setItemsCountValue(itemsCountValue + step)
        setCurrentPage(currentPage + 1)
    }

    const onPageBtnClick = (page) => {
        setItemsCountValue(page * step);
        setCurrentPage(page);
    }

    return (
        <div className='pagination'>
            <button
                className={itemsCountValue > step
                    ? 'pagination__btn'
                    : 'pagination__btn pagination__btn_disabled'
                }
                onClick={prevBtnClick}
            >
                Prev
            </button>
            {pagesArr
                .slice(
                    currentPage > 1 ? currentPage - 2 : currentPage - 1,
                    currentPage > 1 ? currentPage + 1 : currentPage + 2
                )
                .map(page =>
                    <button
                        className={
                            page === currentPage
                                ? 'pagination__btn-page pagination__btn-page_active'
                                : 'pagination__btn-page'
                        }
                        key={page}
                        onClick={() => onPageBtnClick(page)}
                    >
                        {page}
                    </button>
            )}
            <button
                className={allItemsValue > itemsCountValue
                    ? 'pagination__btn'
                    : 'pagination__btn pagination__btn_disabled'
                }
                onClick={nextBtnClick}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
