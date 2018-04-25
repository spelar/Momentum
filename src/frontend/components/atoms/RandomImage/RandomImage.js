import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './RandomImage.scss';

class RandomImage extends Component {
  render() {
    const {randomImage} = this.props;
    return (
      <div className={styles.randomImage}>
        <div className={styles.image}>
          <img src={randomImage} alt="영화 포스터" />
        </div>
        <div className={styles.dim}>

        </div>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>
            관심있는 영화를 <br />
            검색해 보세요 !
          </h1>
          <Link to="/search" className={styles.start}>시작하기</Link>
        </div>
      </div>
    );
  }
}

export default RandomImage;