import React from 'react';
import CharacterItem from './CharacterItem';
import styles from './CharactersList.module.scss';

const CharactersList = (props) => {
  const characters = props.characters;

  return (
    <div className={styles['charactersList']}>
        <div className="container">
          <div className="row">
            {characters.map((character) => (
                <CharacterItem key={character.id} age={character.age} name={character.name} playedBy={character.playedBy} gender={character.gender} died={character.died} />
            ))}
          </div>
        </div>
    </div>
  );
}

export default CharactersList;