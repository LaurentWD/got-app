import React, { useState, useEffect, useCallback } from 'react';
import CharactersList from './components/CharactersList';

const verifyAgeURL = 'https://api.agify.io/?';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(3);
  const [pageSizeNumber, setPageSizeNumber] = useState(6);
  const [characters, setCharacters] = useState([]);

  const charactersURL = `https://www.anapioficeandfire.com/api/characters?page=${pageNumber}&pageSize=${pageSizeNumber}`;

  const fetchCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(charactersURL);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      const loadedCharacters = [];
      let characterNames= '';

      for (const key in data) {
        loadedCharacters.push({
          id: key,
          name: data[key].name,
          playedBy: data[key].playedBy,
          gender: data[key].gender,
          died: data[key].died,
          aliases: data[key].aliases,
          books: data[key].books,
          titles: data[key].titles,
          tvSeries: data[key].tvSeries
        });

        const caracterName = data[key].name.trim().split(' ');

        if(key > 0) {
          characterNames += '&name[]=' + caracterName;
        } else {
          characterNames += 'name[]=' + caracterName;
        }
      }

      const results = await fetch(verifyAgeURL + characterNames);
      const ageData = await results.json();

      for (const key in loadedCharacters) {
        const ageNumber = ageData[key].age;
        const character = loadedCharacters[key];
        character.age = ageNumber;
      }

      setCharacters(loadedCharacters);

    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, [charactersURL]);

  useEffect(() => {
    fetchCharactersHandler();
    
  }, [fetchCharactersHandler, pageNumber]);

  const submitOtherResults = (event) => {
    event.preventDefault();

    setPageNumber(pageNumber + 1);
  }

  return (
    <div>
      <div className="container pt-4 mb-4"><h1>GOT APP</h1></div>
      {!isLoading &&
        <section>
           <CharactersList characters={characters}/>
           <div className="container">
            <button className="btn btn-primary" type="action" onClick={submitOtherResults}>Render Other Results</button>
           </div>
        </section>
      }
    </div>
  );
};

export default App;
