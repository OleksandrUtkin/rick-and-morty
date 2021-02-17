import React, {useEffect, useState} from 'react';
import Pagination from "../../UI/Pagination";
import FullInfo from "../../UI/FullInfo";
import Filter from "../../UI/Filter";
import NumberOfResults from "../../UI/NumberOfResults";

const Characters = () => {
    const [numberOfResults, setNumberOfResults] = useState(null);
    const [elRefs, setElRefs] = React.useState([]);
    const [pages, setPages] = useState(null);
    const [showFullInfo, setShowFullInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingFullInfo, setIsLoadingFullInfo] = useState(false);

    // full info
    const [characterName, setCharacterName] = useState(null);
    const [characterGender, setCharacterGender] = useState(null);
    const [characterSpecies, setCharacterSpecies] = useState(null);
    const [characterOrigin, setCharacterOrigin] = useState(null);
    const [characterType, setCharacterType] = useState(null);
    const [characterLocation, setCharacterLocation] = useState(null);
    const [characterStatus, setCharacterStatus] = useState(null);
    const [characterPhoto, setCharacterPhoto] = useState(null);

    // filter
    const filterOptions = {
        'Name': true,
        'Gender': ['Female', 'Male', 'Genderless', 'Unknown'],
        'Status': ['Alive', 'Dead', 'Unknown']
    }
    const filterValues = {
        "Species": "?species=",
        "Status": "?status=",
        "Gender": "?gender="
    }
    const [filterQuery, setFilterQuery] = useState('');

    const [charactersArr, setCharactersArr] = useState([]);
    const [fetchPages, setFetchPages] = useState(null);
    const [currentFetchPage, setCurrentFetchPage] = useState(1);
    const [isLoadingAllCharacters, setIsLoadingAllCharacters] = useState(false);

    useEffect(() => {
        setElRefs(elRefs => (
            Array(charactersArr.length).fill().map((_, i) => elRefs[i] || React.createRef())
        ));
    }, [charactersArr]);

    // get all characters
    useEffect(() => {
        setIsLoadingAllCharacters(true);
        const getCharacters = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
            await response.json().then(data => {
                setPages(data.info.pages);
                setCharactersArr(data.results);
                setNumberOfResults(data.info.count);
            })
            window.scrollTo(0, 0);
            await setIsLoadingAllCharacters(false);
        }
        getCharacters();
    }, [currentPage]);

    const showFullInfoFunc = (id) => {
        setShowFullInfo(true);
        setIsLoadingFullInfo(true);
        const getCharacterInfo = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            await response.json().then(data => {
                setCharacterName(data.name);
                setCharacterGender(data.gender);
                setCharacterSpecies(data.species);
                setCharacterOrigin(data.name);
                setCharacterType(data.type);
                setCharacterLocation(data.location.name);
                setCharacterStatus(data.status);
                setCharacterPhoto(data.image);
            });
            await setIsLoadingFullInfo(false);
        }
        getCharacterInfo();
    }

    if (isLoadingAllCharacters) return <p className='loading-characters'>Loading...</p>
    return (
        <>
            <Filter
                filterOptions={filterOptions}
            />
            <NumberOfResults numberOfResults={numberOfResults}/>
            <ul className='character'>
                {charactersArr.map((character, index) =>
                    <li
                        ref={elRefs[index]}
                        key={character.id}
                        className='character__li'
                        onClick={() => showFullInfoFunc(character.id)}
                    >
                        <div className="character__photo-wrap">
                            <img className='character__photo' src={character.image} alt={character.name}/>
                        </div>
                        <div className='character__info'>
                            <p className='character__name'>Name: <span>{character.name}</span></p>
                            <p className='character__location'>Location: <span>{character.location.name}</span></p>
                            <p className='character__status'>Status: <span>{character.status}</span></p>
                        </div>
                    </li>
                )}
            </ul>
            {showFullInfo && <FullInfo
                showFullInfo={showFullInfo}
                setShowFullInfo={setShowFullInfo}
                elRefs={elRefs}
                characterName={characterName}
                characterGender={characterGender}
                characterSpecies={characterSpecies}
                characterOrigin={characterOrigin}
                characterType={characterType}
                characterLocation={characterLocation}
                characterStatus={characterStatus}
                isLoadingFullInfo={isLoadingFullInfo}
                characterPhoto={characterPhoto}
            />}
            {pages > 1 && <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />}
        </>
    );
};

export default Characters;
