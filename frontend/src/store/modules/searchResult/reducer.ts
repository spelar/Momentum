import produce from 'immer'; 
import { createReducer } from 'typesafe-actions';
import { SearchResultAction, Item } from './types';
import { RESPONSE_SEARCH_RESULT_MOVIE_LIST, EMPTY_LIST, RESPONSE_MORE_MOVIE_LIST, SET_SCROLL_STATE, SET_LOADING_STATE } from './actions';


export interface SearchResultState {
	isSearchResultPage: boolean;
  searchList: Item[];
  startIndex: number;
  isLastMovie: boolean;
  isScroll: boolean;
	isLoading: boolean;
}

const initialState = {
  isSearchResultPage: false,
  searchList: [],
  startIndex: 1,
  isLastMovie: false,
  isScroll: false,
	isLoading: false
};

const searchResult = createReducer<SearchResultState, SearchResultAction>(initialState, {
  [RESPONSE_SEARCH_RESULT_MOVIE_LIST]: (state, action) => 
		produce(state, draft => {
			const { items, total } = action.payload;
			let isLastMovie = state.isLastMovie;
			if (items.length === total || items.length > total) {
				isLastMovie = true;
			} else {
				isLastMovie = false;
			}
			draft.isLoading = false;
			draft.searchList = items;
			draft.isLastMovie = isLastMovie
		}),
  [EMPTY_LIST]: (state, action) => 
		produce(state, draft => {
			draft.searchList = [];
			draft.isScroll = false;
		}),
  [RESPONSE_MORE_MOVIE_LIST]: (state, action) => 
		produce (state, draft => {
			const { start, total } = action.payload;
			let { items } = action.payload;
			let searchList = state.searchList;
			let isLastMovie = state.isLastMovie;
			items = searchList.concat(items);
			if (items.length === total) {
				isLastMovie = true;
			} else {
				isLastMovie = false;
			}
			draft.searchList = items;
			draft.startIndex = start;
			draft.isLastMovie = isLastMovie;
		}),
  [SET_SCROLL_STATE]: (state, action) => 
		produce(state, draft => {
			let isScroll = state.isScroll;
			if (action.payload) {
				isScroll = true;
			} else {
				isScroll = false;
			}
			draft.isScroll = isScroll;
		}),
	[SET_LOADING_STATE]: (state, action) => 
		produce(state, draft => {
			let isLoading = state.isLoading;
			if (action.payload) {
				isLoading = true;
			} else {
				isLoading = false;
			}
			draft.isLoading = isLoading;
		})
});

export default searchResult;