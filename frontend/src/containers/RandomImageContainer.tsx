import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RandomImage from '../components/RandomImage/RandomImage';
import { RootState } from '../store/modules';
import { randomImageLength } from '../store/modules/randomImages/reducer';
import { getRandomImage } from '../store/modules/randomImages/actions';
import { Helmet } from 'react-helmet';

export interface RandomImageContainerProps {}

const RandomImageContainer = (props: RandomImageContainerProps) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getRandomImage(Math.floor(Math.random() * randomImageLength)));
	},[dispatch]);
	const randomImages = useSelector((state:RootState) => state.randomImages);
	return (
		<>
			<Helmet>
				 <title>Intro - Momentum</title>
			</Helmet>
			<RandomImage randomImage={randomImages.randomImage}/>
		</>
	)
}

export default RandomImageContainer;