import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewEntry from './ReviewEntry.jsx';
import ReviewModal from './ReviewModal.jsx';
const {useState, useEffect} = React;

const ENTRIES_STYLES = {
  height: '325px',
  overflow: 'auto'
}

const ReviewFeed = ({ reviews, currentProduct, request, metaData, QuarterStars, setReviews}) => {
  const [count, setCount] = useState(2);
  const [shownReviews, setShownReviews] = useState([]);
  const [reviewButton,setReviewButton] = useState('More Reviews');
  const [isOpen, SetIsOpen] = useState(false);

  useEffect(() => {
    setShownReviews(reviews.slice(0, count));
  }, [reviews, count])

  const handleClick = () => {
    if (reviews.length > 2) {
      document.getElementById('more-reviews-btn').style.visibility = 'visible';
    }

    if (count > reviews.length - 2) {
      setReviewButton('Less Reviews');

    }

    if (reviewButton === 'Less Reviews') {
      setCount(0);
      setReviewButton('More Reviews');
    }

    setCount(previousCount => previousCount + 2);
  }

  return (
    <div id='review-feed'>
      <div id = 'review-entries' style = {ENTRIES_STYLES}>
        {shownReviews.map((review, index) => {
          return <ReviewEntry review = {review} key = {index} request = {request} currentProduct = {currentProduct}
          setShownReviews = {setShownReviews} count = {count} QuarterStars = {QuarterStars}/>;
        })}
      </div>
      {reviews.length > 2 ? <button id = 'more-reviews-btn btn' onClick = {handleClick}> {reviewButton} </button> : null}
      <button className = 'open-modal btn' onClick = {() => SetIsOpen(true)}> + Add A Review </button>
      <ReviewModal isOpen = {isOpen} onClose = {() => {SetIsOpen(false)}} currentProduct = {currentProduct} request = {request}
      metaData = {metaData} setReviews = {setReviews}/>
    </div>
  );
};

export default ReviewFeed;