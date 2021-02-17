import React from 'react';

const NumberOfResults = ({numberOfResults}) => {
    return (
        <div className='number-of-results'>
            <p>Number of results: <span>{numberOfResults}</span></p>
        </div>
    );
};

export default NumberOfResults;
