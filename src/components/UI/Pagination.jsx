import React from 'react';

const Pagination = ({characters, charactersStep, charactersCountValue, setCharactersCountValue}) => {
    return (
        <div className='pagination'>
            <button
                className={charactersCountValue > charactersStep
                    ? 'pagination__btn'
                    : 'pagination__btn pagination__btn_disabled'
                }
                onClick={() => setCharactersCountValue(charactersCountValue - charactersStep)}
            >
                Prev
            </button>
            <button
                className={characters.length === charactersStep
                    ? 'pagination__btn'
                    : 'pagination__btn pagination__btn_disabled'
                }
                onClick={() => setCharactersCountValue(charactersCountValue + charactersStep)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
