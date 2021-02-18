import React, {useEffect, useRef} from 'react';

const FullInfo = ({
    showFullInfo,
    setShowFullInfo,
    elRefs,
    isLoadingFullInfo,
    characterFullInfo
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
                    <img src={characterFullInfo.characterPhoto} alt="characterName"/>
                </div>
                <div className="full-info__info">
                    {characterFullInfo.characterName && <p>Name: <span>{characterFullInfo.characterName}</span></p>}
                    {characterFullInfo.characterGender && <p>Gender: <span>{characterFullInfo.characterGender}</span></p>}
                    {characterFullInfo.characterSpecies && <p>Species: <span>{characterFullInfo.characterSpecies}</span></p>}
                    {characterFullInfo.characterOrigin && <p>Origin: <span>{characterFullInfo.characterOrigin}</span></p>}
                    {characterFullInfo.characterType && <p>Type: <span>{characterFullInfo.characterType}</span></p>}
                    {characterFullInfo.characterLocation && <p>Location: <span>{characterFullInfo.characterLocation}</span></p>}
                    {characterFullInfo.characterStatus && <p>Status: <span>{characterFullInfo.characterStatus}</span></p>}
                </div>
            </div>
            }
        </div>
    );
};

export default FullInfo;
