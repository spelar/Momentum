import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Header from 'components/atoms/Header/Header'
import {
	setSearchState,
  getMovieList,
  emptyAutoComplete
} from 'store/modules/search';
import {
	setLoadingState
} from 'store/modules/searchResult';

class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.searchInputKeyUp = this.searchInputKeyUp.bind(this);
    this.searchBtnClick = this.searchBtnClick.bind(this);
  }

  searchInputKeyUp(e) {
    if (e.target.value.length > 0) {
      let searchData = {
        searchKeyword : e.target.value
      };
			this.props.setSearchState(true);
      this.props.getMovieList(searchData);
    } else if (e.target.value === '') {
      this.props.emptyAutoComplete();
    }
  }

  searchBtnClick() {
    const {history, search} = this.props;
    if (search.searchKeyword === "") {
      alert("영화 제목을 입력해주세요.")
    } else {
			this.props.setLoadingState(true);
      history.push('/searchResult?search=' + encodeURIComponent(search.searchKeyword));
    }
  }

  render() {
    const search = this.props.search;
    const searchResult = this.props.searchResult;
    return (
      <div>
        <Header
          search={search}
          searchInputKeyUp={this.searchInputKeyUp}
          searchBtnClick={this.searchBtnClick}
          searchResult={searchResult}
        />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      search: state.search.toJS(),
      searchResult: state.searchResult.toJS()
    };
  },
  (dispatch) => ({
		setSearchState: (isSearch) => dispatch(setSearchState(isSearch)),
    getMovieList: (searchData) => dispatch(getMovieList(searchData)),
    emptyAutoComplete: () => dispatch(emptyAutoComplete()),
		setLoadingState: (isLoading) => dispatch(setLoadingState(isLoading))
  })
)(withRouter(SearchContainer));
