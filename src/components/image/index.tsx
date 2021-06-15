import React from 'react';

// IMAGES IN CASE THAT WAS A COMPONENT WITH A LOT OF IMAGES
import noDataImage from '../../assets/images/noDataImage.jpg';
import { Container } from './styled';

interface Props {
	src: 'noResults' ;
}

const ImageComponent: React.FC<Props> = ({ src }) => {

	let img;

		switch (src) {
			case 'noResults': {
				img = noDataImage;
				break;
			}
			default:
		}
	

	return (
		<Container>
			<img src={img} alt="Say something that shoul receive by props or any default one" />
		</Container>
	);
};

export default ImageComponent;
