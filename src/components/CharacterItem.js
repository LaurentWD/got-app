import React from "react";
import styles from './CharacterItem.module.scss';

const CharacterItem = (props) => {
  const nameTextLength = props.name.length > 0;
  const playedByTextLength = props.playedBy[0].length > 0;
  const genderTextLength = props.gender.length > 0;
  const diedTextLength = props.died.length > 0;

  return (
    <div className={`col-sm-4 ${styles['character-item']}`}>
        <div className={styles['character-item-content']}>
          {nameTextLength && <div className={styles['character-name']}>{props.name}</div>}
          {playedByTextLength && <div className={styles['character-playedBy']}><span>Actor:</span> {props.playedBy}</div>}
          {genderTextLength && <div className={styles['character-gender']}><span>Gender:</span> {props.gender}</div>}
          {props.age && <div className={styles['character-age']}><span>Age:</span> {props.age}</div>}
          {diedTextLength && <div className={styles['character-death']}><span>Death:</span> {props.died}</div>}
        </div>
    </div>
  );
}

export default CharacterItem;