import React, {useEffect, useRef} from 'react';

const FullInfo = ({
    showFullInfo,
    setShowFullInfo,
    elRefs,
    characterName,
    characterGender,
    characterSpecies,
    characterOrigin,
    characterType,
    characterLocation,
    characterStatus,
    isLoadingFullInfo,
    characterPhoto
}) => {
    const fullInfoRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fullInfoRef.current) {
                !fullInfoRef.current.contains(event.target)
                && !elRefs.some(el => el.current.contains(event.target))
                && setShowFullInfo(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [elRefs, showFullInfo, setShowFullInfo]);

    return (
        <div className='full-info' ref={fullInfoRef}>
            <button
                className="full-info__close-btn"
                onClick={() => setShowFullInfo(false)}
            >
                <div></div>
                <div></div>
            </button>
            {isLoadingFullInfo ? <p>Loading...</p> :
            <div className="full-info__content">
                <div className="full-info__photo-wrap">
                    <img src={characterPhoto} alt="characterName"/>
                </div>
                <div className="full-info__info">
                    {characterName && <p>Name: <span>{characterName}</span></p>}
                    {characterGender && <p>Gender: <span>{characterGender}</span></p>}
                    {characterSpecies && <p>Species: <span>{characterSpecies}</span></p>}
                    {characterOrigin && <p>Origin: <span>{characterOrigin}</span></p>}
                    {characterType && <p>Type: <span>{characterType}</span></p>}
                    {characterLocation && <p>Location: <span>{characterLocation}</span></p>}
                    {characterStatus && <p>Status: <span>{characterStatus}</span></p>}
                </div>
            </div>
            }
        </div>
    );
};

export default FullInfo;
