import React from 'react';
import './SearchListItem.scss';
import { Item } from '../../store/modules/searchResult';
import search from '../../store/modules/search';

interface SearchListItemProps {
	searchType: string;
	item: Item;
}

const SearchListItem = ({item, searchType}: SearchListItemProps) => {
	// const makePersonList = () => {
	// 	let personName = '';
	// 	if (searchType === 'movie') {
	// 		personName = item.actor.replace(/\|/gi, ", ").slice(0,-2);
	// 		return (
	// 			<span dangerouslySetInnerHTML={{__html: personName}}/>
	// 		) 
	// 	} else if (searchType === 'book') {
	// 	 personName = item.author.replace(/\|/gi, ", ");
	// 		return (
	// 			<span dangerouslySetInnerHTML={{__html: personName}}/>
	// 		)
	// 	}
	// };

	const makeMovieItem = () => {
		return (
			<div>
				<div className="clearFix">
					<h2 dangerouslySetInnerHTML={{__html: item.title}} /><span className="pubDate"> (<span dangerouslySetInnerHTML={{__html: item.pubDate}} />)</span>
				</div>
				<div className="userRating">
					<i className="momentum-icon momentum-icon-star" />
					<span className="score" dangerouslySetInnerHTML={{__html: item.userRating}}/>
				</div>
				<div className="person">
					<span dangerouslySetInnerHTML={{__html: item.actor.replace(/\|/gi, ", ").slice(0,-2)}}/>
				</div>
			</div>
		);
	}

	const makeBookItem =() => {

	}
	return (
		<li className="movie clearFix">
			<a target="_blank" href={item.link} rel="noopener noreferrer">
				{item.image !== "" ? <div className="image"><img src={item.image} alt="영화 포스터" /></div> : <div className="image noimage"><span /></div>}
				<div className="info">
					{searchType === 'movie' ? makeMovieItem() : makeBookItem()}
					{/* <div className="clearFix">
						<h2 dangerouslySetInnerHTML={{__html: item.title}} /><span className="pubDate"> (<span dangerouslySetInnerHTML={{__html: item.pubDate}} />)</span>
					</div>
					<div className="userRating">
						<i className="momentum-icon momentum-icon-star" />
						<span className="score" dangerouslySetInnerHTML={{__html: item.userRating}}/>
					</div>
					<div className="person">
						{makePersonList()}
					</div> */}
				</div>
			</a>
		</li>
	)
}

export default SearchListItem;