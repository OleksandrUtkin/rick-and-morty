import React, {useState, useRef, useEffect} from 'react';

const Filter = ({
    filterOptions,
    setFilterByStatusValue,
    filterByStatus,
    setCurrentPage,
    filterByGender,
    setFilterByGenderValue
}) => {
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const filterGenderValueRef = useRef(null);
    const filterStatusValueRef = useRef(null);
    const clearGenderFilterRef = useRef(null);
    const clearStatusFilterRef = useRef(null);

    const clickOnGenderFilter = (event) => {
        if (clearGenderFilterRef.current && clearGenderFilterRef.current.contains(event.target)) {
            setShowGenderDropdown(false);
        } else {
            setShowGenderDropdown(!showGenderDropdown);
        }
    }

    const clickOnStatusFilter = (event) => {
        if (clearStatusFilterRef.current && clearStatusFilterRef.current.contains(event.target)) {
            setShowStatusDropdown(false);
        } else {
            setShowStatusDropdown(!showStatusDropdown);
        }
    }

    const clickOnStatusFilterItem = (status) => {
        filterByStatus.current = status;
        setFilterByStatusValue(status);
        setCurrentPage(1);
    }

    const clickOnGenderFilterItem = (gender) => {
        filterByGender.current = gender;
        setFilterByGenderValue(gender);
        setCurrentPage(1);
    }

    const clearFilterByGender = () => {
        filterByGender.current = false;
        setShowGenderDropdown(false);
        setFilterByGenderValue('');
        setCurrentPage(1);
    }

    const clearFilterByStatus = () => {
        filterByStatus.current = false;
        setShowStatusDropdown(false);
        setFilterByStatusValue('');
        setCurrentPage(1);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterGenderValueRef.current && showGenderDropdown)
                !filterGenderValueRef.current.contains(event.target) &&
                showGenderDropdown &&
                setShowGenderDropdown(false);
            else if (filterStatusValueRef.current && showStatusDropdown)
                !filterStatusValueRef.current.contains(event.target) &&
                showStatusDropdown &&
                setShowStatusDropdown(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showGenderDropdown, showStatusDropdown]);

    return (
        <div className='filter'>
            {filterOptions.Name &&
            <div className='filter__name'>
                <span>Name:</span>
                <input
                    className='filter__input'
                    type="text"
                    placeholder='Enter the name'
                />
            </div>
            }
            {filterOptions.Gender &&
            <div
                className='filter__value'
                onClick={clickOnGenderFilter}
                ref={filterGenderValueRef}
            >
                    <span>
                        {filterByGender.current ? filterByGender.current : 'Gender'}
                    </span>
                {filterByGender.current && (
                    <div
                        className="filter__clear"
                        ref={clearGenderFilterRef}
                        onClick={clearFilterByGender}
                    >
                        <div></div>
                        <div></div>
                    </div>
                )}
                {showGenderDropdown &&
                <ul className='filter__dropdown'>
                    {filterOptions.Gender.map((gender, index) =>
                        <li
                            key={gender + index}
                            className='filter__dropdown-item'
                            onClick={() => clickOnGenderFilterItem(gender)}
                        >
                            {gender}
                        </li>
                    )}
                </ul>
                }
            </div>
            }
            {filterOptions.Status &&
            <div
                className='filter__value'
                onClick={clickOnStatusFilter}
                ref={filterStatusValueRef}
            >
                <span>
                    {filterByStatus.current ? filterByStatus.current : 'Status'}
                </span>
                {filterByStatus.current && (
                    <div
                        className="filter__clear"
                        ref={clearStatusFilterRef}
                        onClick={clearFilterByStatus}
                    >
                        <div></div>
                        <div></div>
                    </div>
                )}
                {showStatusDropdown &&
                <ul className='filter__dropdown'>
                    {filterOptions.Status.map((status, index) =>
                        <li
                            key={status + index}
                            className='filter__dropdown-item'
                            onClick={() => clickOnStatusFilterItem(status)}
                        >
                            {status}
                        </li>
                    )}
                </ul>
                }
            </div>
            }
        </div>
    );
};

export default Filter;
