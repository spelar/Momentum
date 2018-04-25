import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Header from 'components/atoms/Header/Header'
import SearchList from 'components/atoms/SearchList/SearchList';
import {
  searchIconClick,
  getAutoComplete,
  emptyAutoComplete
} from 'store/modules/search';

class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.searchInputKeyUp = this.searchInputKeyUp.bind(this);
  }


  searchInputKeyUp(e) {
    if (e.target.value.length > 0) {
      this.props.getAutoComplete(e.target.value);
    } else if (e.target.value.length === 0) {
      setTimeout(() => {
        this.props.emptyAutoComplete();
      }, 300);
    }
  }

  render() {
    const search = this.props.search;
    return (
      <div>
        <Header
          search={search}
          searchIconClick={this.props.searchIconClick}
          searchInputKeyUp={this.searchInputKeyUp}
        />
        <SearchList
          search={search}
        />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      search: state.search
    };
  },
  (dispatch) => ({
    searchIconClick: () => dispatch(searchIconClick()),
    getAutoComplete: (searchKeyword) => dispatch(getAutoComplete(searchKeyword)),
    emptyAutoComplete: () => dispatch(emptyAutoComplete())
  })
)(withRouter(SearchContainer));
