import React, {useEffect, useState} from 'react';
import Pagination from "../../UI/Pagination";
import FullInfo from "../../UI/FullInfo";

const Characters = () => {
    const [elRefs, setElRefs] = React.useState([]);
    const [allCharactersValue, setAllCharactersValue] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [pages, setPages] = useState(null);
    const [showFullInfo, setShowFullInfo] = useState(false);
    const [charactersCountValue, setCharactersCountValue] = useState(10);
    const step = 10;

    const [isLoadingFullInfo, setIsLoadingFullInfo] = useState(false);
    const [characterName, setCharacterName] = useState(null);
    const [characterGender, setCharacterGender] = useState(null);
    const [characterSpecies, setCharacterSpecies] = useState(null);
    const [characterOrigin, setCharacterOrigin] = useState(null);
    const [characterType, setCharacterType] = useState(null);
    const [characterLocation, setCharacterLocation] = useState(null);
    const [characterStatus, setCharacterStatus] = useState(null);
    const [characterPhoto, setCharacterPhoto] = useState(null);

    useEffect(() => {
        setElRefs(elRefs => (
            Array(characters.length).fill().map((_, i) => elRefs[i] || React.createRef())
        ));
    }, [characters]);

    useEffect(() => {
       const getAllCharacters = async () => {
           const response = await fetch('https://rickandmortyapi.com/api/character/');
           await response.json().then(data => {
               setAllCharactersValue(data.info.count);
               setPages(Math.ceil(data.info.count / step));
           })
       }
        getAllCharacters()
    }, []);

    useEffect(() => {
        const charactersCountArr = [];
        const getCharacters = async () => {
            for (let i = charactersCountValue - step + 1; i <= charactersCountValue; i++) await charactersCountArr.push(i);
            const response = await fetch(`https://rickandmortyapi.com/api/character/${charactersCountArr}`);
            await response.json().then(data => setCharacters(data));
            await window.scrollTo(0, 0);
        }
        getCharacters();
    }, [charactersCountValue]);

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

    return (
        <>
            <ul className='character'>
                {characters.map((character, index) =>
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
                allItemsValue = {allCharactersValue}
                itemsCountValue={charactersCountValue}
                setItemsCountValue={setCharactersCountValue}
                step={step}
                pages={pages}
            />}
        </>
    );
};

export default Characters;
