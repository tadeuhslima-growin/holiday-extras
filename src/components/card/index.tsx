import React from 'react';
import { PokemonList } from '../../services/type';
import './style.scss';

interface Props {
	list: PokemonList;
}
 
const Card: React.FC<Props> = ({list}) => {

  // It receives a string and separeted it by comma
  const getTags = (tags: string): string => {
    if (tags) {
      const newTags: string[] = tags.split(" ");
      let newPrepTags: string = '';
      newTags.map((item: string, index: number) => {
        return newPrepTags = `${newPrepTags} ${item}${index === newTags.length - 1 ? '.' : ','}`;
      })
      return newPrepTags;
    } else {
      return 'Oops... No tags for this one!';
    }
  }

	return (
    <div className="photo-card">
      <div className="photo-card__image">
        <img src={list.images.large} alt={`Pokemon ${list.name}}`} />
      </div>
      <div className="photo-card__header">
        <a rel="noreferrer" href={list.tcgplayer.url} target="_blank"><strong>{list.name}</strong> </a> by <a href={list.images.large} target="_blank" rel="noreferrer">{list.artist}</a>
      </div>
      <div className="photo-card__desc">
        <strong>Description:</strong>  {list.attacks ? list.attacks[0].text || 'We still working to get you this info!!!' : 'We still working to get you this info!!!'}
      </div>
      <div className="photo-card__tags">
        <strong>Tags:</strong> {getTags(list.abilities ? list.abilities[0].text : '')}
      </div>
    </div>
	);
};

export default Card;
