import produce from 'immer'; 
import { createReducer } from 'typesafe-actions';
import { SearchAction } from './types';
import { SET_SEARCH_STATE, RESPONSE_MOVIE_LIST, EMPTY_AUTO_COMPLETE, SET_SEARCH_KEYWORD, SET_SEARCH_TYPE } from './actions';
import { Item } from '../searchResult';

export interface SearchState {
	isSearch: boolean;
	autoCompleteKeywords: Item[];
  searchKeyword: string;
  total: number;
  isAutoComplete: boolean;
	searchType: string;
}

const initialState: SearchState = {
	isSearch: false,
  autoCompleteKeywords: [],
  searchKeyword: '',
  total: 0,
  isAutoComplete: false,
	searchType: ''
};

const search = createReducer<SearchState, SearchAction>(initialState, {
	[SET_SEARCH_STATE]: (state, action) => 
		produce(state, draft => {
			if (action.payload) {
				draft.isSearch = true;
			} else {
				draft.isSearch = false;
			}
		}),
  [RESPONSE_MOVIE_LIST]: (state, action) => 
		produce(state, draft => {
			const { items, total, searchKeyword} = action.payload;
			if (state.isSearch) {
				draft.autoCompleteKeywords = items;
				draft.searchKeyword = searchKeyword;
				draft.total = total;
				draft.isAutoComplete = true;
			} else {
				return state
			}
		}),
  [EMPTY_AUTO_COMPLETE]: (state, action) => 
		produce(state, draft => {
			draft.isSearch = false;
			draft.autoCompleteKeywords = [];
			draft.searchKeyword = '';
			draft.total = 0;
			draft.isAutoComplete = false;
		}),
  [SET_SEARCH_KEYWORD]: (state, action) => 
		produce(state, draft => {
			draft.autoCompleteKeywords = [];
			draft.searchKeyword = JSON.parse(action.payload);
			draft.total = 0;
			draft.isAutoComplete = false;
		}),
	[SET_SEARCH_TYPE]: (state, action) => 
		produce(state, draft => {
			draft.searchType = action.payload;
		}),
});

export default search;