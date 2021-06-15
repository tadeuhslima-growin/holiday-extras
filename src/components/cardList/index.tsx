import React from 'react';
import { PokemonList } from '../../services/type';
import Card from '../card';
import SkeletonCard from '../skeleton';
import './style.scss';

interface Props {
	data: PokemonList[];
  loading?: boolean;
}

const CardList: React.FC<Props> = ({data , loading = false}) => {
	return (
		<div className="container">
      <div className="container__grid">
        {data.length > 0 && data.map((item: PokemonList) => {
          return <Card key={item.id} list={item} />
        })}
        {loading && <SkeletonCard howMany={8} />}
      </div>
    </div>
	);
};

export default CardList;
