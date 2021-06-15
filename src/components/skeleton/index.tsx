import React, { ReactNode } from 'react';
import './style.scss';

interface Props {
	howMany?: number;
}
 
const SkeletonCard: React.FC<Props> = ({howMany= 1}) => {

	const items: ReactNode[] = [];

	let i = 0;
	for (i = 0; i < howMany; i++) {
		items.push(
			<div key={i} className="photo-skeleton">
				<div className="photo-card__skeleton">
				</div>
			</div>
		)
	}

	return (
		<>
			{items}
		</>
		
	);
};

export default SkeletonCard;
