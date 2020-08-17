import React from 'react';
import Header from '../components/Header/Header';

export interface BookContainerProps {}

const BookContainer = (props: BookContainerProps) => {
	return (
		<Header type='book' />
	)
}

export default BookContainer;