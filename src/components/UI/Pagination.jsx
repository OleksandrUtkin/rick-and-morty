import React from 'react';

const Pagination = ({
    pages,
    currentPage,
    setCurrentPage
}) => {
    const pagesArr = [];
    for (let i = 1; i <= pages; i++) pagesArr.push(i);

    const prevBtnClick = () => {
        setCurrentPage(currentPage - 1)
    }

    const nextBtnClick = () => {
        setCurrentPage(currentPage + 1)
    }

    const onPageBtnClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className='pagination'>
            <button
                className={currentPage >= 2
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
                className={currentPage < pages
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
