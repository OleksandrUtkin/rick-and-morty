import React, {useEffect, useState} from 'react';
import Pagination from "../../UI/Pagination";

const Characters = (props) => {
    const [characters, setCharacters] = useState([]);
    const [charactersCountValue, setCharactersCountValue] = useState(10);
    const charactersStep = 10;

    useEffect(() => {
        const charactersCountArr = [];
        const getCharacters = async () => {
            for (let i = charactersCountValue - charactersStep + 1; i <= charactersCountValue; i++) await charactersCountArr.push(i);
            const response = await fetch(`https://rickandmortyapi.com/api/character/${charactersCountArr}`);
            await response.json().then(data => setCharacters(data));
        }
        getCharacters();
    }, [charactersCountValue]);

    console.log(characters);

    return (
        <>
            <ul className='character'>
                {characters.map(character =>
                    <li key={character.id} className='character__li'>
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
            <Pagination
                characters={characters}
                charactersCountValue={charactersCountValue}
                setCharactersCountValue={setCharactersCountValue}
                charactersStep={charactersStep}
            />
        </>
    );
};

export default Characters;
